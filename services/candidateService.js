import Candidate from "../models/Candidate.js";

export const createCandidate = async (data) => {
    console.log(data);
  const candidate = await Candidate.create({
    firstname: data.firstname,
    lastname: data.lastname,
    name: data.firstname ?? " " +" "+data.lastname ?? "",
    email: data.email,
    phone: data.phone,
    location: data.location,
    role: data.role,
    job_role: data.job_role,
    current_company: data.current_company,
    education: data.education,
    experience: data.experience,
    skills: data.key_skills,
    linkedin:  data.linkedin,
    portfolio:  data.portfolio,
    notice_period:  data.notice_period,
    expected_salary:  data.expected_salary,
  });

  return candidate;
};

export const getCandidate = async (data) => {

    const candidate = await Candidate.findAll();

    return candidate;

};


export const getCandidateById = async (id) => {

    const candidate = await Candidate.find(id);

    return candidate;

};
