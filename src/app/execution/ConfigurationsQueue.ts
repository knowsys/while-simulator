import { Configuration } from '../../core/interpreter/Configuration';

export class ConfigurationsQueue {
    private data: (Configuration | undefined)[];
    /**
     * Whether at least as many elements as the maximum size of the queue got added
     */
    private isFull = false;
    /**
     * Index where the next element would get added.
     */
    private nextElementIndex = 0;

    constructor(
        /**
         * Maximum size of the queue
         */
        private size: number
    ) {
        this.data = Array.from(Array(size));
    }

    /**
     * Adds a element to the end of the queue.
     *
     * If the queue is full, the first element of it will get removed.
     */
    public add(configuration: Configuration) {
        this.data[this.nextElementIndex] = configuration;

        this.nextElementIndex = (this.nextElementIndex + 1) % this.size;
        if (!this.isFull && this.nextElementIndex === 0) {
            this.isFull = true;
        }
    }

    /**
     * Converts the queue to array.
     *
     * The last element of the array will be the element last inserted into the queue.
     */
    public toArray() {
        const firstElementIndex = this.isFull ? this.nextElementIndex : 0;
        return (
            Array.from(Array(this.size))
                .map(
                    (_value, index) =>
                        this.data[(firstElementIndex + index) % this.size]
                )
                // Remove invalid elements if the queue wasn't full
                .filter((value) => value !== undefined) as Configuration[]
        );
    }
}
