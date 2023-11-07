import axios from 'axios';

export const executeCode = async (sourceCode: string, languageId: number) => {
  try {
    const response = await axios.post(
      `http://peerprep-code-api:9000/run-code`,
      { source_code: sourceCode, language_id: languageId }
    );

    const token = response.data.token;

    if (!token) {
      return 'Error executing code: No token received';
    }

    const maxAttempts = 3;
    let attempts = 0;
    let resultResponse;

    while (attempts < maxAttempts) {
      resultResponse = await axios.get(
        `http://peerprep-code-api:9000/submission/${token}`
      );

      if (resultResponse.data.status_id === 3) {
        return resultResponse.data.stdout || resultResponse.data.stderr;
      } else if (resultResponse.data.status_id > 3) {
        return 'Error executing code';
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return 'Execution timed out';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `Error executing code: ${error.response?.data || error.message}`;
    } else {
      return 'An unknown error occurred';
    }
  }
};
