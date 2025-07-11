const CV_PROMPT = `
  Generate a CV in strict JSON format using the following schema.
  **Try to quantify your achievements and use action verbs.
  **Try to be UK style CV.
  **Tailor the CV to the job position and company, with matching the CV data provided as context and match the key word as much as possible to pass ATC scan.
  **Fill in as many fields as possible. Leave fields empty or as empty arrays only if there's truly no relevant data.
  **Do not add any extra text or comments outside the JSON.
  **Follow the structure exactly:
  **use simple english
  **make sure update the job title to match the job position in the job description.`;

const CV_template = `{
  "name": "",
  "title": "",
  "location": "",
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
    "certification": [
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
  ]
  }`;

const CL_template = `
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
  }`;

const CL_PROMPT = `
    Generate a Cover Letter in strict JSON format using the following schema.
    **Tailor the cover letter to the job position and company, using the CV data provided as context.
    **The content shoud around 280 words.
    **Do not add any extra text or comments outside the JSON.
    **The cover letter should be tailored to the job position and company, using the CV data provided as context.
    **every paragraph should be one job and describe how this job relates to the job position and company.
    **use simple english
    `;

const getCvClPROMPT = (jobDescription: string, cvData: string) => `
this is my CV data:
${cvData}
which includes my work experience, education, skills, and projects.
this is the job description: ${jobDescription}, please refer to it achieve the following:

you now have 2 task:
1. ${CV_PROMPT}
2. ${CL_PROMPT}

you need to return me a json follow this structure exactly:
{
  "cv": ${CV_template},
  "coverLetter":${CL_template}
}`;

export { CV_PROMPT, CL_PROMPT, getCvClPROMPT };
