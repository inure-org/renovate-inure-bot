// consts de dependências locais
const {
    createServerConfig,
    baseConfig,
    defaultLabels,
    availableRouletteReviewerByRole
} = require("../lib/shared");

module.exports = createServerConfig([
    {
        repository: "inure-renovate-forks/inure-pages",

        ...baseConfig,

        labels: [
            ...defaultLabels,

            "section::dev",
            "devops::plan",
            "group::knowledge",
            "Category:Pages",
            "backend",
            "golang"
        ],

        reviewers: availableRouletteReviewerByRole("inure-pages"),
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
