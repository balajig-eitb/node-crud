import { now } from "sequelize/lib/utils";
import Candidate from "../models/Candidate.js";
import { generateRefId } from "../utils/refId.js";

export const createCandidate = async (data) => {
   // console.log(data);

    const name = data.firstname ?? " " +" "+data.lastname ?? "";
    const ref_id = generateRefId('EITB');

    const candidate = await Candidate.create({
    ref_id : ref_id,
    firstname: data.firstname,
    lastname: data.lastname,
    name: name,
    email: data.email,
    phone: data.phone,
    location: data.location,
    role: data.role,
    job_role: data.job_role,
    current_company: data.currentCompany,
    education: data.education,
    experience: data.experience,
    skills: data.key_skills,
    linkedin:  data.linkedin,
    portfolio:  data.portfolio,
    notice_period:  data.noticePeriod,
    expected_salary:  data.expectedSalary,
    status: 'New',
  });

  return candidate;
};

export const getCandidate = async (data) => {

    const candidate = await Candidate.findAll({order: [['applied_date', 'DESC']]});
    //candidate['appliedDate'] = candidate.applied_date;

    const mappedCandidates = candidate.map(c => ({
      ...c.toJSON(),
      appliedDate: c.applied_date,
    }));

    return mappedCandidates;

};


export const getCandidateById = async (id) => {

    const candidate = await Candidate.find(id);

    return candidate;

};



export const updateCandidate = async (data) => {
  try {
    const candidate = await Candidate.findByPk(data.id);

    if (!candidate) {
      return null; // caller decides 404
    }

    const name = `${data.firstname ?? candidate.firstname ?? ""} ${data.lastname ?? candidate.lastname ?? ""}`.trim();

    await candidate.update({
      firstname: data.firstname ?? candidate.firstname,
      lastname: data.lastname ?? candidate.lastname,
      name: name,
      email: data.email ?? candidate.email,
      phone: data.phone ?? candidate.phone,
      location: data.location ?? candidate.location,
      role: data.role ?? candidate.role,
      job_role: data.job_role ?? candidate.job_role,
      current_company: data.currentCompany ?? candidate.current_company,
      education: data.education ?? candidate.education,
      experience: data.experience ?? candidate.experience,
      skills: data.key_skills ?? candidate.skills,
      linkedin: data.linkedin ?? candidate.linkedin,
      portfolio: data.portfolio ?? candidate.portfolio,
      notice_period: data.noticePeriod ?? candidate.notice_period,
      expected_salary: data.expectedSalary ?? candidate.expected_salary,
    });

    return candidate;

  } catch (error) {
    throw error;
  }
};