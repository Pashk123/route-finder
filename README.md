# RouteFinder

Dieses Projekt wurde mit [Angular CLI](https://github.com/angular/angular-cli) Version 18.1.3 erstellt.

## Überblick

Dieses Projekt ist eine Single Page Application (SPA), die es Benutzern ermöglicht, Start- und Zielorte einzugeben und die Route zwischen diesen Orten zu berechnen. Es verwendet Angular für das Frontend und Express für das Backend. Die Anwendung kommuniziert mit den OpenRouteService APIs, um Adressvorschläge und Routeninformationen zu erhalten.

## Voraussetzungen

Stellen Sie sicher, dass Node.js und npm auf Ihrem System installiert sind.

## Installation

### Backend

1. Navigieren Sie in das Stammverzeichnis des Projekts.
2. Installieren Sie die Backend-Abhängigkeiten und starten Sie den Backend-Server:

    ```bash
    npm install
    node server.js
    ```

   Der Backend-Server sollte nun auf `http://localhost:3000` laufen.

### Frontend

1. Öffnen Sie ein neues Terminal und navigieren Sie in das Angular-Projektverzeichnis (normalerweise `src`).
2. Installieren Sie die Frontend-Abhängigkeiten und starten Sie den Frontend-Server:

    ```bash
    cd path/to/your/angular/project
    npm install
    ng serve
    ```

   Der Frontend-Entwicklungsserver sollte nun auf `http://localhost:4200` laufen.

## APIs

Die Anwendung nutzt die folgenden OpenRouteService API-Endpunkte:
- `https://api.openrouteservice.org/geocode/search`
- `https://api.openrouteservice.org/v2/directions/`
- `https://api.openrouteservice.org/geocode/autocomplete`

## Entwicklungsserver

Führen Sie `ng serve` aus, um einen Entwicklungsserver zu starten. Navigieren Sie zu `http://localhost:4200/`. Die Anwendung wird automatisch neu geladen, wenn Sie eine der Quelldateien ändern.

## Build

Führen Sie `ng build` aus, um das Projekt zu bauen. Die Build-Artefakte werden im Verzeichnis `dist/` gespeichert.

## Unit-Tests ausführen

Führen Sie `ng test` aus, um die Unit-Tests über [Karma](https://karma-runner.github.io) auszuführen.


## End-to-End-Tests ausführen

Führen Sie `ng e2e` aus, um die End-to-End-Tests über eine Plattform Ihrer Wahl auszuführen. Um diesen Befehl zu verwenden, müssen Sie zuerst ein Paket hinzufügen, das End-to-End-Testfunktionen implementiert.


## Weitere Hilfe

Um weitere Hilfe zum Angular CLI zu erhalten, verwenden Sie `ng help` oder schauen Sie sich die [Angular CLI Übersicht und Befehlsreferenz](https://angular.dev/tools/cli) an.

## Verzeichnisstruktur

