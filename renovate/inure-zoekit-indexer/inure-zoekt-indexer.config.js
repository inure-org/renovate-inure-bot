// const de dependências locais
const {
    createServerConfig,
    baseConfig,
    defaultLabels,
    availableRouletteReviewerByRole
} = require("../lib/shared");

module.exports = createServerConfig([
    {
        repository: "inure-renovate-forks/inure-zoekt-indexer",

        ...baseConfig,

        labels: [
            ...defaultLabels,
            
            "group::global search"
        ],

        reviewers: availableRouletteReviewerByRole("inure-zoekt-indexer", "maintainer"),
        reviewersSampleSize: 1,

        enabledManagers: [
            "asdf",
            "gomod"
        ],

        prConcurrentLimit: 4,
        semanticCommits: "disabled",
        packageRules: [],

        postUpdateOptions: [
            "gomodTidy",
            "gomodUpdateImportPaths"
        ]
    }
]);
