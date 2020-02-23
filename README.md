# VideoManager Cypress E2E Tests

## Introduction

This project contains automated E2E tests for the VideoManager application.

## Setup

1. Setup environment for pg-native. This is a requirement for the test suite to connect to Postgres. <a href="./docs/pg-native.md">Instructions</a>.
2. Install dependencies: `yarn`.

## How to Run

1. Start the VideoManagerServer application in QA mode: `mvn -P qa spring-boot:run`.
2. Start the VideoManagerClient application normally: `yarn start`.
3. FOR DEVELOPING TESTS: Open the test runner GUI with: `yarn open`.
4. FOR RUNNING TEST SUITE: Execute the suite with: `yarn run:suite`.