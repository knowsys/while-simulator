import { ExecutionGenerator } from '../../core/ast/Statement';
import { Configuration, Variables } from '../../core/interpreter/Configuration';
import { Program } from '../../core/interpreter/Program';
import { ExecutorInfo } from '../store/programInfo/ProgramInfo';
import { ConfigurationsQueue } from './ConfigurationsQueue';

/**
 * Executes a program in small batches
 *
 * After each batch {@code setTimeout(..., 0)} gets used to schedule the next batch.
 * This way the next batch gets placed at the end of the JavaScript event loop and thus the website stays interactive.
 */
export class BatchExecutor {
    private executionStep = 0;
    private configurations = new ConfigurationsQueue(
        this.maxConfigurationsToStore
    );
    private lastConfiguration: Configuration;

    private didExecutionFinish = false;
    private isRunning = false;

    private generator: ExecutionGenerator;
    private remainingSteps?: number;
    /**
     * Timeout for next execution batch
     */
    private timeoutHandle?: ReturnType<typeof setTimeout>;

    constructor(
        program: Program,
        public readonly variables: Variables,
        private stepsPerExecutionBatch: number,
        private executionBatchTimeoutDelay: number,
        private maxConfigurationsToStore: number,
        private onExecutorInfoUpdate: () => void
    ) {
        if (
            stepsPerExecutionBatch <= 0 ||
            !Number.isInteger(stepsPerExecutionBatch) ||
            executionBatchTimeoutDelay < 0
        ) {
            throw new Error();
        }

        this.lastConfiguration = new Configuration(null, variables);
        this.generator = program.start(this.lastConfiguration);
    }

    /**
     * Sets the amount of steps before automatically pausing execution.
     *
     * Set to undefined to run indefinitely.
     */
    public setRemainingSteps(remainingSteps?: number) {
        if (
            remainingSteps !== undefined &&
            (remainingSteps < 0 || !Number.isInteger(remainingSteps))
        ) {
            throw new Error();
        }
        this.remainingSteps = remainingSteps;
    }

    /**
     * Continues program execution.
     *
     * Does nothing if the execution is finished or already running.
     */
    public start() {
        if (this.isRunning || this.didExecutionFinish) {
            return;
        }

        this.isRunning = true;
        this.executeBatch();
    }

    /**
     * Pauses program execution.
     *
     * Does nothing if the execution is already stopped.
     */
    public stop() {
        if (!this.isRunning) {
            return;
        }

        this.isRunning = false;
        if (this.timeoutHandle !== undefined) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = undefined;
        }

        this.onExecutorInfoUpdate();
    }

    /**
     * Runs a single execution batch and schedules the next batch using setTimeout
     */
    private executeBatch() {
        console.info(
            '[Executor] Continuing execution at step',
            this.executionStep
        );

        if (
            this.didExecutionFinish ||
            (this.remainingSteps !== undefined && this.remainingSteps <= 0)
        ) {
            this.isRunning = false;
            this.onExecutorInfoUpdate();
            return;
        }

        for (let i = 0; i < this.stepsPerExecutionBatch; i++) {
            const result = this.generator.next();
            if (result.done) {
                this.didExecutionFinish = true;
                break;
            }
            if (result.value instanceof Configuration) {
                this.configurations.add(result.value);
                this.lastConfiguration = result.value;
                this.executionStep++;
                if (this.remainingSteps !== undefined) {
                    this.remainingSteps -= 1;
                    if (this.remainingSteps <= 0) {
                        break;
                    }
                }
            }
        }

        if (this.remainingSteps !== undefined && this.remainingSteps <= 0) {
            this.isRunning = false;
        }

        if (this.isRunning) {
            this.timeoutHandle = setTimeout(() => {
                this.timeoutHandle = undefined;
                this.executeBatch();
            }, this.executionBatchTimeoutDelay);
        }

        this.onExecutorInfoUpdate();
    }

    public getStoreInfo(): ExecutorInfo {
        return {
            didExecutionFinish: this.didExecutionFinish,
            isRunning: this.isRunning,
            lastConfigurations: this.configurations.toArray(),
            executionStep: this.executionStep,
        };
    }
}
