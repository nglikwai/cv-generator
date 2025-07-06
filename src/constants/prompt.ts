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

const getCvClPROMPT = (url: string, cvData: string) => `
this is my CV data:
${cvData}
which includes my work experience, education, skills, and projects.
this is a job link: ${url}, please go through the job and achieve the following:
you now have 2 task:
1. Generate a CV in strict JSON format using the following schema.
*Tailor the CV to the job position and company, with matching the CV data provided as context.
*Fill in as many fields as possible. Leave fields empty or as empty arrays only if there's truly no relevant data.
*Do not add any extra text or comments outside the JSON.
*Follow this structure exactly:

2.Generate a Cover Letter in strict JSON format using the following schema.
*Tailor the cover letter to the job position and company, using the CV data provided as context.
*Fill in as many fields as possible. Leave fields empty or as empty arrays only if there's truly no relevant data.
*Do not add any extra text or comments outside the JSON.
*The cover letter should be tailored to the job position and company, using the CV data provided as context.
*every paragraph should be one job and describe how this job relates to the job position and company.
*use simple english

you need to return me a json follow this structure exactly:
{
  "cv": 
{
  "name": "",
  "title": "",
  "contact": {
    "email": "",
    "phone": "",
    "github": "",
    "website": "",
    "linkedin": ""
  },
  "summary": "",
  "proficiencies": {
    "Languages & Frameworks": [],
    "State Management": [],
    "Design Systems & Tools": [],
    "Testing": [],
    "Performance & SEO": [],
    "CI/CD & DevOps": [],
    "Other Tools": []
  },
  "experience": [
    {
      "title": "",
      "company": "",
      "date": "",
      "summary": "",
      "details": []
    }
  ],
  "education": [
    {
      "name": "",
      "institution": "",
      "line1": "",
      "date": "",
      "results": []
    }
  ],
  "projects": [
    {
      "name": "",
      "company": "",
      "description": ""
    }
  ],
  "additional_skills": [],
  "skills": [
    {
      "name": "",
      "score": 0
    }
  ],
  "languages": [
    {
      "name": "",
      "score": 0
    }
  ],
  "qualifications": []
  },
  "coverLetter": {
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
}`;

export { CV_PROMPT, CL_PROMPT, getCvClPROMPT };
