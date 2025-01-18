/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type enUS from './en-US';

const locale: typeof enUS = {
    spreadsheetLabel: 'Feuille de calcul',
    spreadsheetRightLabel: 'Plus de feuilles',

    toolbar: {
        undo: 'Annuler',
        redo: 'Refaire',
        formatPainter: 'Reproduire la mise en forme',
        currencyFormat: 'Format en devise',
        percentageFormat: 'Format en pourcentage',
        numberDecrease: 'Diminuer les décimales',
        numberIncrease: 'Augmenter les décimales',
        moreFormats: 'Plus de formats',
        font: 'Police',
        fontSize: 'Taille de police',
        bold: 'Gras',
        italic: 'Italique',
        strikethrough: 'Barré',
        subscript: 'Indice',
        superscript: 'Exposant',
        underline: 'Souligner',
        textColor: {
            main: 'Couleur du texte',
            right: 'Choisir la couleur',
        },
        resetColor: 'Réinitialiser',
        customColor: 'PERSONNALISÉ',
        alternatingColors: 'Couleurs alternées',
        confirmColor: 'OK',
        cancelColor: 'Annuler',
        collapse: 'Réduire',
        fillColor: {
            main: 'Couleur de remplissage',
            right: 'Choisir la couleur',
        },
        border: {
            main: 'Bordure',
            right: 'Style de bordure',
        },
        mergeCell: {
            main: 'Fusionner les cellules',
            right: 'Choisir le type de fusion',
        },
        horizontalAlignMode: {
            main: 'Alignement horizontal',
            right: 'Alignement',
        },
        verticalAlignMode: {
            main: 'Alignement vertical',
            right: 'Alignement',
        },
        textWrapMode: {
            main: 'Renvoi à la ligne',
            right: 'Mode de renvoi à la ligne',
        },
        textRotateMode: {
            main: 'Rotation du texte',
            right: 'Mode de rotation du texte',
        },
        freezeTopRow: 'Figer la ligne du haut',
        sortAndFilter: 'Trier et filtrer',
        findAndReplace: 'Rechercher et remplacer',
        sum: 'SOMME',
        autoSum: 'Somme automatique',
        moreFunction: 'Plus de fonctions',
        conditionalFormatting: 'Mise en forme conditionnelle',
        comment: 'Commentaire',
        pivotTable: 'Tableau croisé dynamique',
        chart: 'Graphique',
        screenshot: 'Capture d\'écran',
        splitColumn: 'Fractionner le texte',
        insertImage: 'Insérer une image',
        insertLink: 'Insérer un lien',
        dataValidation: 'Validation des données',
        protection: 'Protéger la feuille',

        clearText: 'Effacer la couleur',
        noColorSelectedText: 'Aucune couleur sélectionnée',

        toolMore: 'Plus',
        toolLess: 'Moins',
        toolClose: 'Fermer',
        toolMoreTip: 'Plus de fonctionnalités',
        moreOptions: 'Plus d\'options',

        cellFormat: 'Configuration du format de cellule',
        print: 'Imprimer',
        borderMethod: {
            top: 'Ligne de cadre supérieure',
            bottom: 'Ligne de cadre inférieure',
            left: 'Ligne de cadre gauche',
            right: 'Ligne de cadre droite',
        },
        more: 'Plus',
        hideGridlines: 'Masquer le quadrillage',
        showGridlines: 'Afficher le quadrillage',
        toggleGridlines: 'Activer/désactiver le quadrillage',
    },
    defaultFmt: {
        Automatic: {
            text: 'Automatique',
            value: 'Général',
            example: '',
        },
        Number: {
            text: 'Nombre',
            value: '##0.00',
            example: '1000.12',
        },
        Percent: {
            text: 'Pourcentage',
            value: '#0.00%',
            example: '12.21%',
        },
        PlainText: {
            text: 'Texte brut',
            value: '@',
            example: '',
        },
        Scientific: {
            text: 'Scientifique',
            value: '0.00E+00',
            example: '1.01E+5',
        },
        Accounting: {
            text: 'Comptabilité',
            value: '¥(0.00)',
            example: '¥(1200.09)',
        },
        Thousand: {
            text: 'Dix Mille',
            value: 'w',
            example: '1 2000 2500',
        },
        Currency: {
            text: 'Devise',
            value: '¥0.00',
            example: '¥1200.09',
        },
        Digit: {
            text: 'Dix Mille 2 Décimales',
            value: 'w0.00',
            example: '2 2500.55',
        },
        Date: {
            text: 'Date',
            value: 'yyyy-MM-dd',
            example: '2017-11-29',
        },
        Time: { text: 'Heure', value: 'hh:mm AM/PM', example: '3:00 PM' },
        Time24H: { text: 'Heure 24H', value: 'hh:mm', example: '15:00' },
        DateTime: { text: 'Date et heure', value: 'yyyy-MM-dd hh:mm AM/PM', example: '2017-11-29 3:00 PM' },
        DateTime24H: { text: 'Date et heure 24H', value: 'yyyy-MM-dd hh:mm', example: '2017-11-29 15:00' },
        CustomFormats: { text: 'Formats personnalisés', value: 'fmtOtherSelf', example: '' },
    },
    format: {
        moreCurrency: 'Plus de formats de devise',
        moreDateTime: 'Plus de formats de date et heure',
        moreNumber: 'Plus de formats de nombre',

        titleCurrency: 'Formats de devise',
        decimalPlaces: 'Décimales',
        titleDateTime: 'Formats de date et heure',
        titleNumber: 'Formats de nombre',
    },
    print: {
        normalBtn: 'Normal',
        layoutBtn: 'Disposition de la page',
        pageBtn: 'Aperçu des sauts de page',

        menuItemPrint: 'Imprimer (Ctrl+P)',
        menuItemAreas: 'Zones d\'impression',
        menuItemRows: 'Lignes de titre à imprimer',
        menuItemColumns: 'Colonnes de titre à imprimer',
    },
    align: {
        left: 'gauche',
        center: 'centre',
        right: 'droite',

        top: 'haut',
        middle: 'milieu',
        bottom: 'bas',
    },

    button: {
        confirm: 'OK',
        cancel: 'Annuler',
        close: 'Fermer',
        update: 'Mettre à jour',
        delete: 'Supprimer',
        insert: 'Insérer',
        prevPage: 'Précédent',
        nextPage: 'Suivant',
        total: 'total :',
    },
    punctuation: {
        tab: 'Tabulation',
        semicolon: 'point-virgule',
        comma: 'virgule',
        space: 'espace',
    },
    colorPicker: {
        collapse: 'Réduire',
        customColor: 'PERSONNALISÉ',
        change: 'Changer',
        confirmColor: 'OK',
        cancelColor: 'Annuler',
    },
    borderLine: {
        borderTop: 'bordureHaut',
        borderBottom: 'bordureBas',
        borderLeft: 'bordureGauche',
        borderRight: 'bordureDroite',
        borderNone: 'aucuneBordure',
        borderAll: 'toutesLesBordures',
        borderOutside: 'bordureExtérieure',
        borderInside: 'bordureIntérieure',
        borderHorizontal: 'bordureHorizontale',
        borderVertical: 'bordureVerticale',
        borderColor: 'couleurDeBordure',
        borderSize: 'tailleDeBordure',
        borderType: 'typeDeBordure',
    },
    merge: {
        all: 'Tout fusionner',
        vertical: 'Fusion verticale',
        horizontal: 'Fusion horizontale',
        cancel: 'Annuler la fusion',
        overlappingError: 'Impossible de fusionner des zones qui se chevauchent',
        partiallyError: 'Impossible d\'effectuer cette opération sur des cellules partiellement fusionnées',
        confirm: {
            title: 'Continuer la fusion ne conserverait que la valeur de la cellule en haut à gauche, les autres valeurs seront supprimées. Voulez-vous continuer ?',
            cancel: 'Annuler la fusion',
            confirm: 'Continuer la fusion',
            waring: 'Avertissement',
            dismantleMergeCellWaring: 'Cela entraînera la division de certaines cellules fusionnées. Voulez-vous continuer ?',
        },
    },
    filter: {
        confirm: {
            error: 'Il y a eu un problème',
            notAllowedToInsertRange: 'Déplacement des cellules non autorisé ici tant que le filtre n\'est pas effacé',
        },
    },
    textWrap: {
        overflow: 'Débordement',
        wrap: 'Renvoi à la ligne',
        clip: 'Couper',
    },
    textRotate: {
        none: 'Aucun',
        angleUp: 'Incliner vers le haut',
        angleDown: 'Incliner vers le bas',
        vertical: 'Empiler verticalement',
        rotationUp: 'Pivoter vers le haut',
        rotationDown: 'Pivoter vers le bas',
    },
    sheetConfig: {
        delete: 'Supprimer',
        copy: 'Copier',
        rename: 'Renommer',
        changeColor: 'Changer la couleur',
        hide: 'Masquer',
        unhide: 'Afficher',
        moveLeft: 'Déplacer à gauche',
        moveRight: 'Déplacer à droite',
        resetColor: 'Réinitialiser la couleur',
        cancelText: 'Annuler',
        chooseText: 'Confirmer la couleur',

        tipNameRepeat: 'Le nom de l\'onglet ne peut pas être répété ! Veuillez modifier',
        noMoreSheet:
            'Le classeur contient au moins une feuille de calcul visible. Pour supprimer la feuille sélectionnée, veuillez insérer une nouvelle feuille ou afficher une feuille masquée.',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer',
        redoDelete: 'Peut être annulé par Ctrl+Z',
        noHide: 'Impossible de masquer, au moins une étiquette de feuille doit être conservée',
        chartEditNoOpt: 'Cette opération n\'est pas autorisée en mode d\'édition de graphique !',
        sheetNameErrorTitle: 'Il y a eu un problème',
        sheetNameSpecCharError: 'Le nom ne peut pas dépasser 31 caractères, ne peut pas commencer ou se terminer par \', et ne peut pas contenir : [ ] : \\ ? * /',
        sheetNameCannotIsEmptyError: 'Le nom de la feuille ne peut pas être vide.',
        sheetNameAlreadyExistsError: 'Le nom de la feuille existe déjà. Veuillez entrer un autre nom.',
        deleteSheet: 'Supprimer la feuille de calcul',
        deleteSheetContent:
            'Confirmer la suppression de cette feuille de calcul. Elle ne pourra pas être récupérée après suppression. Êtes-vous sûr de vouloir la supprimer ?',
        addProtectSheet: 'Protéger la feuille de calcul',
        removeProtectSheet: 'Déprotéger la feuille de calcul',
        changeSheetPermission: 'Modifier les autorisations de la feuille de calcul',
        viewAllProtectArea: 'Voir toutes les zones de protection',
    },
    rightClick: {
        copy: 'Copier',
        copyAs: 'Copier en tant que',
        cut: 'Couper',
        paste: 'Coller',
        pasteSpecial: 'Collage spécial',
        pasteValue: 'Coller la valeur',
        pasteFormat: 'Coller le format',
        pasteColWidth: 'Coller la largeur de la colonne',
        pasteBesidesBorder: 'Coller à côté des styles de bordure',
        insert: 'Insérer',
        insertRow: 'Insérer une ligne',
        insertRowBefore: 'Insérer une ligne avant',
        insertColumn: 'Insérer une colonne',
        insertColumnBefore: 'Insérer une colonne avant',
        delete: 'Supprimer',
        deleteCell: 'Supprimer la cellule',
        insertCell: 'Insérer une cellule',
        deleteSelected: 'Supprimer la sélection',
        hide: 'Masquer',
        hideSelected: 'Masquer la sélection',
        showHide: 'Afficher les masqués',
        toTopAdd: 'Ajouter vers le haut',
        toBottomAdd: 'Ajouter vers le bas',
        toLeftAdd: 'Ajouter vers la gauche',
        toRightAdd: 'Ajouter vers la droite',
        deleteSelectedRow: 'Supprimer la ligne sélectionnée',
        deleteSelectedColumn: 'Supprimer la colonne sélectionnée',
        hideSelectedRow: 'Masquer la ligne sélectionnée',
        showHideRow: 'Afficher la ligne sélectionnée',
        rowHeight: 'Hauteur de ligne',
        hideSelectedColumn: 'Masquer la colonne sélectionnée',
        showHideColumn: 'Afficher/Masquer la colonne',
        columnWidth: 'Largeur de colonne',
        to: 'Vers',
        left: 'Gauche',
        right: 'Droite',
        top: 'Haut',
        bottom: 'Bas',
        moveLeft: 'Déplacer à gauche',
        moveUp: 'Déplacer vers le haut',
        moveRight: 'Déplacer à droite',
        moveDown: 'Déplacer vers le bas',
        add: 'Ajouter',
        row: 'Ligne',
        column: 'Colonne',
        width: 'Largeur',
        height: 'Hauteur',
        number: 'Nombre',
        confirm: 'Confirmer',
        orderAZ: 'Ordre A-Z',
        orderZA: 'Ordre Z-A',
        clearSelection: 'Effacer',
        clearContent: 'Effacer le contenu',
        clearFormat: 'Effacer les formats',
        clearAll: 'Tout effacer',
        matrix: 'Opération matricielle',
        sortSelection: 'Trier',
        filterSelection: 'Filtrer',
        chartGeneration: 'Créer un graphique',
        firstLineTitle: 'Titre de la première ligne',
        untitled: 'Sans titre',
        array1: 'Tableau unidimensionnel',
        array2: 'Tableau bidimensionnel',
        array3: 'Tableaux multidimensionnels',
        diagonal: 'Diagonale',
        antiDiagonal: 'Anti-diagonale',
        diagonalOffset: 'Décalage diagonal',
        offset: 'Décalage',
        boolean: 'Booléen',
        flip: 'Retourner',
        upAndDown: 'De haut en bas',
        leftAndRight: 'De gauche à droite',
        clockwise: 'Dans le sens des aiguilles d\'une montre',
        counterclockwise: 'Dans le sens inverse des aiguilles d\'une montre',
        transpose: 'Transposer',
        matrixCalculation: 'Calcul matriciel',
        plus: 'Plus',
        minus: 'Moins',
        multiply: 'Multiplier',
        divided: 'Divisé',
        power: 'Puissance',
        root: 'Racine',
        log: 'Logarithme',
        delete0: 'Supprimer les valeurs 0 aux deux extrémités',
        removeDuplicate: 'Supprimer les valeurs en double',
        byRow: 'Par ligne',
        byCol: 'Par colonne',
        generateNewMatrix: 'Générer une nouvelle matrice',
        fitContent: 'Adapter au contenu',
        freeze: 'Figer',
        freezeCol: 'Figer jusqu\'à cette colonne',
        freezeRow: 'Figer jusqu\'à cette ligne',
        cancelFreeze: 'Annuler le figement',
        zenEditor: 'Éditeur plein écran',
        deleteAllRowsAlert: 'Vous ne pouvez pas supprimer toutes les lignes de la feuille',
        deleteAllColumnsAlert: 'Vous ne pouvez pas supprimer toutes les colonnes de la feuille',
        hideAllRowsAlert: 'Vous ne pouvez pas masquer toutes les lignes de la feuille',
        hideAllColumnsAlert: 'Vous ne pouvez pas masquer toutes les colonnes de la feuille',
        protectRange: 'Protéger les lignes et les colonnes',
        editProtectRange: 'Définir la plage de protection',
        removeProtectRange: 'Supprimer la plage de protection',
        turnOnProtectRange: 'Ajouter une plage de protection',
        viewAllProtectArea: 'Voir toutes les zones de protection',
    },
    info: {
        tooltip: 'Info-bulle',
        error: 'Erreur',
        notChangeMerge: 'Vous ne pouvez pas apporter de modifications partielles aux cellules fusionnées',
        detailUpdate: 'Nouvellement ouvert',
        detailSave: 'Cache local restauré',
        row: 'Ligne',
        column: 'Colonne',
        loading: 'Chargement...',

        copy: 'Copier',
        return: 'Quitter',
        rename: 'Renommer',
        tips: 'Renommer',
        noName: 'Feuille de calcul sans titre',
        wait: 'en attente de mise à jour',

        add: 'Ajouter',
        addLast: 'plus de lignes en bas',
        backTop: 'Retour en haut',
        // eslint-disable-next-line no-template-curly-in-string
        pageInfo: 'Total ${total}, ${totalPage} page, actuel ${currentPage}',
        nextPage: 'Suivant',

        tipInputNumber: 'Veuillez entrer le nombre',
        tipInputNumberLimit: 'L\'augmentatiion de la plage est limitée à 1-100',

        tipRowHeightLimit: 'La hauteur de la ligne doit être comprise entre 0 et 545',
        tipColumnWidthLimit: 'La largeur de la colonne doit être comprise entre 0 et 2038',
        // eslint-disable-next-line no-template-curly-in-string
        pageInfoFull: 'Total ${total}, ${totalPage} page, toutes les données affichées',
        problem: 'Il y a eu un problème',
        forceStringInfo: 'Nombre stocké en tant que texte',
    },
    clipboard: {
        paste: {
            exceedMaxCells: 'Le nombre de cellules collées dépasse le nombre maximum de cellules',
            overlappingMergedCells: 'La zone de collage chevauche des cellules fusionnées',
        },
        shortCutNotify: {
            title: 'Veuillez coller en utilisant les raccourcis clavier.',
            useShortCutInstead: 'Contenu Excel détecté. Utilisez le raccourci clavier pour coller.',
        },
    },
    statusbar: {
        sum: 'Somme',
        average: 'Moyenne',
        min: 'Min',
        max: 'Max',
        count: 'Nombre numérique',
        countA: 'Nombre',
        clickToCopy: 'Cliquez pour copier',
        copied: 'Copié',
    },
    autoFill: {
        copy: 'Copier la cellule',
        series: 'Remplir la série',
        formatOnly: 'Format uniquement',
        noFormat: 'Sans format',
    },

    rangeSelector: {
        placeholder: 'Sélectionnez la plage ou entrez la valeur',
        tooltip: 'Sélectionnez la plage',
    },

    shortcut: {
        sheet: {
            'zoom-in': 'Zoom avant',
            'zoom-out': 'Zoom arrière',
            'reset-zoom': 'Réinitialiser le niveau de zoom',
            'select-below-cell': 'Sélectionner la cellule en dessous',
            'select-up-cell': 'Sélectionner la cellule au-dessus',
            'select-left-cell': 'Sélectionner la cellule à gauche',
            'select-right-cell': 'Sélectionner la cellule à droite',
            'select-next-cell': 'Sélectionner la cellule suivante',
            'select-previous-cell': 'Sélectionner la cellule précédente',
            'select-up-value-cell': 'Sélectionner la cellule au-dessus qui a une valeur',
            'select-below-value-cell': 'Sélectionner la cellule en dessous qui a une valeur',
            'select-left-value-cell': 'Sélectionner la cellule à gauche qui a une valeur',
            'select-right-value-cell': 'Sélectionner la cellule à droite qui a une valeur',
            'expand-selection-down': 'Étendre la sélection vers le bas',
            'expand-selection-up': 'Étendre la sélection vers le haut',
            'expand-selection-left': 'Étendre la sélection vers la gauche',
            'expand-selection-right': 'Étendre la sélection vers la droite',
            'expand-selection-to-left-gap': 'Étendre la sélection jusqu\'à l\'écart à gauche',
            'expand-selection-to-below-gap': 'Étendre la sélection jusqu\'à l\'écart en dessous',
            'expand-selection-to-right-gap': 'Étendre la sélection jusqu\'à l\'écart à droite',
            'expand-selection-to-up-gap': 'Étendre la sélection jusqu\'à l\'écart en haut',
            'select-all': 'Tout sélectionner',
            'toggle-editing': 'Basculer en mode édition',
            'delete-and-start-editing': 'Effacer et commencer à éditer',
            'abort-editing': 'Annuler l\'édition',
            'break-line': 'Saut de ligne',
            'set-bold': 'Basculer en gras',
            'start-editing': 'Commencer l\'édition (Sélection dans l\'éditeur)',
            'set-italic': 'Basculer en italique',
            'set-underline': 'Basculer en souligné',
            'set-strike-through': 'Basculer en barré',
        },
    },
    'sheet-view': 'Visualisation de la feuille',
    'sheet-edit': 'Édition de la feuille',

    definedName: {
        managerTitle: 'Gérer les noms définis',
        managerDescription: 'Créez un nom défini en sélectionnant des cellules ou des formules, et en entrant le nom souhaité dans la zone de texte.',
        addButton: 'Ajouter un nom défini',
        featureTitle: 'Noms définis',
        ratioRange: 'Plage',
        ratioFormula: 'Formule',
        confirm: 'Confirmer',
        cancel: 'Annuler',
        scopeWorkbook: 'Classeur',
        inputNamePlaceholder: 'Veuillez entrer un nom (espace non autorisé)',
        inputCommentPlaceholder: 'Veuillez entrer un commentaire',
        inputRangePlaceholder: 'Veuillez entrer une plage (espace non autorisé)',
        inputFormulaPlaceholder: 'Veuillez entrer une formule (espace non autorisé)',
        nameEmpty: 'Le nom ne peut pas être vide',
        nameDuplicate: 'Le nom existe déjà',
        formulaOrRefStringEmpty: 'La formule ou la chaîne de référence ne peut pas être vide',
        formulaOrRefStringInvalid: 'Formule ou chaîne de référence invalide',
        defaultName: 'NomDéfini',
        updateButton: 'Mettre à jour',
        deleteButton: 'Supprimer',
        deleteConfirmText: 'Êtes-vous sûr de vouloir supprimer ce nom défini?',
        nameConflict: 'Le nom est en conflit avec le nom de la fonction',
        nameInvalid: 'Le nom est invalide',
        nameSheetConflict: 'Le nom est en conflit avec le nom de la feuille',
    },
    uploadLoading: {
        loading: 'Chargement..., restant', // 正在上传，当前剩余
        error: 'Erreur', // 加载失败
    },
    permission: {
        toolbarMenu: 'Protection',
        panel: {
            title: 'Protéger les lignes et les colonnes',
            name: 'Nom',
            protectedRange: 'Plage protégée',
            permissionDirection: 'Description des permissions',
            permissionDirectionPlaceholder: 'Entrez la description des permissions',
            editPermission: 'Modifier les permissions',
            onlyICanEdit: 'Seul moi peut modifier',
            designedUserCanEdit: 'Utilisateurs spécifiés peuvent modifier',
            viewPermission: 'Voir les permissions',
            othersCanView: 'Les autres peuvent voir',
            noOneElseCanView: 'Personne d\'autre ne peut voir',
            designedPerson: 'Personnes spécifiées',
            addPerson: 'Ajouter une personne',
            canEdit: 'Peut modifier',
            canView: 'Peut voir',
            delete: 'Supprimer',
            currentSheet: 'Feuille actuelle',
            allSheet: 'Toutes les feuilles',
            edit: 'Modifier',
            Print: 'Imprimer',
            Comment: 'Commenter',
            Copy: 'Copier',
            SetCellStyle: 'Définir le style de cellule',
            SetCellValue: 'Définir la valeur de la cellule',
            SetHyperLink: 'Définir le lien hypertexte',
            Sort: 'Trier',
            Filter: 'Filtrer',
            PivotTable: 'Tableau croisé dynamique',
            FloatImage: 'Image flottante',
            RowHeightColWidth: 'Hauteur de ligne et largeur de colonne',
            RowHeightColWidthReadonly: 'Hauteur de ligne et largeur de colonne en lecture seule',
            FilterReadonly: 'Filtre en lecture seule',
            nameError: 'Le nom ne peut pas être vide',
            created: 'Créé',
            iCanEdit: 'Je peux modifier',
            iCanNotEdit: 'Je ne peux pas modifier',
            iCanView: 'Je peux voir',
            iCanNotView: 'Je ne peux pas voir',
            emptyRangeError: 'La plage ne peut pas être vide',
            rangeOverlapError: 'La plage ne peut pas se chevaucher',
            rangeOverlapOverPermissionError: 'La plage ne peut pas se chevaucher avec la plage ayant la même permission',
            InsertHyperlink: 'Insérer un lien hypertexte',
            SetRowStyle: 'Définir le style de ligne',
            SetColumnStyle: 'Définir le style de colonne',
            InsertColumn: 'Insérer une colonne',
            InsertRow: 'Insérer une ligne',
            DeleteRow: 'Supprimer la ligne',
            DeleteColumn: 'Supprimer la colonne',
            EditExtraObject: 'Modifier l\'objet supplémentaire',
        },
        dialog: {
            allowUserToEdit: 'Autoriser l\'utilisateur à modifier',
            allowedPermissionType: 'Types de permissions autorisées',
            setCellValue: 'Définir la valeur de la cellule',
            setCellStyle: 'Définir le style de cellule',
            copy: 'Copier',
            alert: 'Alerte',
            search: 'Rechercher',
            alertContent: 'Cette plage est protégée et aucune permission de modification n\'est actuellement disponible. Si vous avez besoin de modifier, veuillez contacter le créateur.',
            userEmpty: 'aucune personne désignée, Partagez le lien pour inviter des personnes spécifiques.',
            listEmpty: 'Vous n\'avez défini aucune plage ou feuille comme protégée.',
            commonErr: 'La plage est protégée, et vous n\'avez pas la permission pour cette opération. Pour modifier, veuillez contacter le créateur.',
            editErr: 'La plage est protégée, et vous n\'avez pas la permission de modifier. Pour modifier, veuillez contacter le créateur.',
            pasteErr: 'La plage est protégée, et vous n\'avez pas la permission de coller. Pour coller, veuillez contacter le créateur.',
            setStyleErr: 'La plage est protégée, et vous n\'avez pas la permission de définir les styles. Pour définir les styles, veuillez contacter le créateur.',
            copyErr: 'La plage est protégée, et vous n\'avez pas la permission de copier. Pour copier, veuillez contacter le créateur.',
            workbookCopyErr: 'Le classeur est protégé, et vous n\'avez pas la permission de copier. Pour copier, veuillez contacter le créateur.',
            setRowColStyleErr: 'La plage est protégée, et vous n\'avez pas la permission de définir les styles de ligne et de colonne. Pour définir les styles de ligne et de colonne, veuillez contacter le créateur.',
            moveRowColErr: 'La plage est protégée, et vous n\'avez pas la permission de déplacer les lignes et les colonnes. Pour déplacer les lignes et les colonnes, veuillez contacter le créateur.',
            moveRangeErr: 'La plage est protégée, et vous n\'avez pas la permission de déplacer la sélection. Pour déplacer la sélection, veuillez contacter le créateur.',
            autoFillErr: 'La plage est protégée, et vous n\'avez pas la permission pour le remplissage automatique. Pour utiliser le remplissage automatique, veuillez contacter le créateur.',
            filterErr: 'La plage est protégée, et vous n\'avez pas la permission de filtrer. Pour filtrer, veuillez contacter le créateur.',
            operatorSheetErr: 'La feuille de calcul est protégée, et vous n\'avez pas la permission de travailler sur la feuille de calcul. Pour travailler sur la feuille de calcul, veuillez contacter le créateur.',
            insertOrDeleteMoveRangeErr: 'La plage insérée ou supprimée intersecte la plage protégée, et cette opération n\'est pas supportée pour le moment.',
            printErr: 'La feuille de calcul est protégée, et vous n\'avez pas la permission d\'imprimer. Pour imprimer, veuillez contacter le créateur.',
            formulaErr: 'La plage ou la plage référencée est protégée, et vous n\'avez pas la permission de modifier. Pour modifier, veuillez contacter le créateur.',
            hyperLinkErr: 'La plage est protégée, et vous n\'avez pas la permission de définir des liens hypertextes. Pour définir des liens hypertextes, veuillez contacter le créateur.',
        },
        button: {
            confirm: 'Confirmer',
            cancel: 'Annuler',
            addNewPermission: 'Ajouter une nouvelle permission',
        },
    },
};

export default locale;
