// consts de dependências locais
const {
    createServerConfig,
    baseConfig,
    foundationLabels,
    updateNothing
} = require("../lib/shared");

const {
    prVueMajor2,
    prLabel,
    prJest,
    prInureUISVG
} = require("../lib/npm");

module.exports = createServerConfig([
    {
        repository: "inure-renovate-forks/pajamas-adoption-scanner",
        ...baseConfig,
        labels: foundationLabels,

        includePaths: [
            // package de alto-nível
            "*",

            // a workspace do dashboard
            "dashboard/**"
        ],

        reviewers: ["markrian"],
        rangeStrategy: "auto",
        enabledManagers: ["npm"],

        packageRules: [
            updateNothing,
            prInureUISVG,
            prVueMajor2,
            prBabel,
            prJest
        ],

        updateInternalDeps: true
    }
]);
