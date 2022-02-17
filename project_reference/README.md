# Project Reference

Project Reference allows use to have different modules of our code (mostly monorepos) structured in smaller pieces.
We can improve build time, enforce logical separation between components and origanize our code in a better way.

## Example
```
/
├── src/
│   ├── converter.ts
│   └── units.ts
├── test/
│   ├── converter-tests.ts
│   └── units-tests.ts
└── tsconfig.json
```

This code have a single tsconfig, such that even when we need to only compile `src` the `test` folder gets compiled too.

To deal with this, typescript introduced a new config properties in version 3.0 called `reference`.

We can now define our code to look like this:
```
/
├── src/
│   ├── converter.ts
│   ├── units.ts
│   └── tsconfig.json
├── test/
│   ├── converter-tests.ts
│   ├── units-tests.ts
│   └── tsconfig.json
└── tsconfig.base.json
```

## Explanation
- `test` needs `src` to run but the `src` does not necessarily need `test` to run. So `test` should be dependent on `src`.
- the `tsconfig.base.json` in the can be used to store common config properties in both components by used the `extends` property in each configuration file
- in the `src` configuration file, we'll add a new property called `reference` such as:
    ```json
    {
        "compilerOptions": {
            // remains the same
        },
        "reference": [
            { "path": "../src"}
        ]
    }
    ```
    - the `reference` property is an array of objects with `path` to other component(s) it is dependent on
    - the `path` must point to a folder that as a `tsconfig.json` in it or directory to the configuration file if it's a different name
- the component that acts as a dependency, (in our case `src`) must have the `composite` set to `true` in it's configuration file.
- also the `declaration` and `declarationMap` set to `true`
