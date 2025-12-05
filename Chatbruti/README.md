# n8n Workflow: Configuration des Identifiants Mistral AI

Ce README fournit des instructions pour configurer les identifiants de l'API Mistral AI dans un workflow n8n.

## Prérequis

*   Une instance n8n opérationnelle.
*   Une clé API Mistral AI valide. Vous pouvez l'obtenir depuis votre compte Mistral AI.

## Configuration des Identifiants Mistral AI

Pour permettre à vos workflows n8n d'interagir avec l'API Mistral AI, vous devez créer et configurer une nouvelle credential:

1.  **Ouvrez votre workflow n8n** ou créez-en un nouveau.
2.  **Ajoutez un nœud** qui nécessitera une authentification API (par exemple, un nœud "HTTP Request" ou un nœud Mistral AI si disponible via une intégration).
3.  Dans les paramètres du nœud, localisez la section "Credentials" ou "Authentification".
4.  Cliquez sur le bouton **"Add new credential"** (Ajouter de nouveaux identifiants).
5.  **Sélectionnez le type de credential**:
    *   Si un type "Mistral AI API" est disponible, choisissez-le.
    *   Sinon, choisissez "Header Auth" ou "Generic Credential" si vous devez configurer l'en-tête manuellement.
6.  **Remplissez les détails de la credential**:
    *   **Credential Name (Nom de l'identifiant)**: Donnez un nom descriptif, par exemple `Mistral AI API Key`.
    *   **Pour "Header Auth"**:
        *   **Header Value (Valeur de l'en-tête)**: `Bearer VOTRE_CLE_API_MISTRAL` (Remplacez `VOTRE_CLE_API_MISTRAL` par votre clé API réelle).
    *   **Si un champ spécifique pour la clé API est présent**: Entrez directement votre clé API dans ce champ.
7.  **Cliquez sur "Save" (Enregistrer)** pour sauvegarder la credential.

Vos identifiants Mistral AI sont maintenant configurés et peuvent être sélectionnés dans n'importe quel nœud de votre workflow n8n qui requiert cette authentification.
