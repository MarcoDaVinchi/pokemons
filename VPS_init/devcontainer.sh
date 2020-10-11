#!/bin/bash
mkdir -p ~/.vscode-server ~/.vscode-server-insiders

python3 ./contrib.py

apt-get update -y && apt-get install -y \
    gnupg2 \
    apt-transport-https \
    ca-certificates && \
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    echo "deb https://packages.cloud.google.com/apt cloud-sdk main" \
    | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

apt-get update -y && apt-get install -y \
    fonts-firacode \
    default-jre

apt-get update -y && apt-get install -y \
    google-cloud-sdk \
    google-cloud-sdk-app-engine-python \
    google-cloud-sdk-app-engine-python-extras \
    google-cloud-sdk-cbt \
    google-cloud-sdk-cloud-build-local \
    google-cloud-sdk-bigtable-emulator \
    kubectl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    rm /var/log/lastlog /var/log/faillog