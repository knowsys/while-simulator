# Maintenance the application

## Updating NPM dependencies

Check which dependencies have a newer version available: `npm exec --package npm-check-updates npm-check-updates`.

For updates which may include breaking changes according to semantic versioning (marked in red), check the changelog/documentation of the packages for infos on how to upgrade.

Upgrade the dependencies using `npm exec --package npm-check-updates npm-check-updates`, `npm update` and `npm audit`.

Test the application after updating dependencies.

## Update external links

Check the links in `src/app/components/links.ts`, `README.md` and `docs` for validity.
