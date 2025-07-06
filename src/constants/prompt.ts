const CV_PROMPT = `
[... write your requirement here ...]
Generate a CV in strict JSON format using the following schema.
Fill in as many fields as possible. Leave fields empty or as empty arrays only if there's truly no relevant data.
Do not add any extra text or comments outside the JSON.
Follow this structure exactly:`;

const CL_PROMPT = `
[... write your requirement here ...]
*Generate a Cover Letter in strict JSON format using the following schema.
*Fill in as many fields as possible. Leave fields empty or as empty arrays only if there's truly no relevant data.
*Do not add any extra text or comments outside the JSON.
*The cover letter should be tailored to the job position and company, using the CV data provided as context.
*every paragraph should be one job and describe how this job relates to the job position and company.
*use simple english
*Follow this structure exactly:
{
  "applicant": {
    "name": "",
    "title": "",
    "phone": "",
    "email": ""
  },
  "recipient": {
    "to": "",
    "company": ""
  },
  "body": [
    ""
  ]
}

*below is the CV data to use as context for the cover letter:
`;

export { CV_PROMPT, CL_PROMPT };
