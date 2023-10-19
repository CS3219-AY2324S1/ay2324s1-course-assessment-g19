# PeerPrep

## Installation

1. Go to Releases
2. Click on Assignment X
3. Download Source code (zip)
4. Open up in code editor of choice

## Install dependencies

Software required for development: Docker Makefile (if unavailable, check the
Makefile commands and execute commands directly) Anaconda (or any other
environment management system suitable for python interpreters)

```bash
cd ay2324s1-course-assessment-g19
cd client
npm install
cd ../question-api
npm install
cd ../user-api
conda create --name user-api python=3.9
conda activate user-api
pip install -r requirements.txt
# If there are any dependencies that are unable to be installed, (i.e. uvloop on windows)
# Delete dependency from requirements.txt and reinstall
```

## Start the development server

Ensure that Docker daemon is running

```bash
make dev
```

## Debugging

Take note that installing new dependencies require a rebuilding of the Docker
images that were fixed
