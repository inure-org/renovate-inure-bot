terraform {
    required_providers {
        inure = {
            source = "inure-org/inure",
            version = "15.9.0"
        }
    }

    backend "http" {}
}

provider "inure" {
    token = var.inure_renovate_bot_token
}

variable "inure_renovate_bot_token" {
    description = "token do inure para o grupo do bot inure-renovate-forks"
    type        = string
    sensitive   = true
}

variable "projects" {
    description = "lista de projetos para gerenciar com o renovate. os projetos devem estar especificados com seus namespaces e paths."
    type        = list(string)
}

data "inure_group" "forks" {
    full_path = "inure-renovate-forks"
}

data "inure_project" "upstream" {
    for_each = toset(var.projects)

    path_with_namespace = each.key
}

resource "inure_project" "forks" {
    # cria um projeto forcado para cada configuração de projeto
    for_each = data.inure_project.upstream

    # forcar pelo projeto da upstream
    forked_from_project_id = each.value.id

    # especificar alguns nomes e grupos parentes do projeto
    name             = each.value.name
    description      = each.value.description
    namespace_id     = data.inure_group.forks.id
    visibility_level = "public"

    # configurações do projeto de upstream que importam para o fork
    ci_config_path = each.value.ci_config_path

    # configurações de pull mirroring
    import_url                          = each.value.http_url_to_repo
    mirror                              = true
    mirror_trigger_builds               = false
    mirror_overwrites_diverged_branches = true
    only_mirror_protected_branches      = true

    lifecycle {
        prevent_destroy = true
    }
}

output "renovate_forks" {
    value = [
        for k, v in inure_project.forks : { "id" = v.id, "name" = v.name, "path_with_namespace" = v.path_with_namespace, "web_url" : v.web_url }
    ]
}
