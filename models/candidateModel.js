// import { db } from "../db.js";

// const Candidate = Object.create()

// export const createCandidate = async (data) => {

//  const query = `
//     INSERT INTO candidates (
//       firstname, lastname, email, phone_number, current_location, state,
//       job_role, experience, current_company, highest_education, key_skills,
//       linkedin_url, portfolio_url, github_url, notice_period, expected_salary
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     data.firstname,
//     data.lastname,
//     data.email,
//     data.phone_number,
//     data.current_location,
//     data.state,
//     data.job_role,
//     data.experience,
//     data.current_company,
//     data.highest_education,
//     JSON.stringify(data.key_skills),
//     data.linkedin_url,
//     data.portfolio_url,
//     data.github_url,
//     data.notice_period,
//     data.expected_salary,
//   ];

//   const [result] = await db.execute(query, values);
//   return result;

// }

// export const getAllCandidates = async () => {
//   const [rows] = await db.execute("select * from candidates");
//   return rows;
// }

// export const getCandidateById = async (id) => {
//   const [rows] = await db.execute("select * from candidates where id = ?", [id]);
//   return rows[0];
// }

// export const updateCandidate = async (id, data) => {
//   const query = `
//     UPDATE candidates SET
//       firstname=?, lastname=?, email=?, phone_number=?, current_location=?, state=?,
//       job_role=?, experience=?, current_company=?, highest_education=?, key_skills=?,
//       linkedin_url=?, portfolio_url=?, github_url=?, notice_period=?, expected_salary=?
//     WHERE id=?
//   `;
//   const values = [
//     data.firstname, data.lastname, data.email, data.phone_number, data.current_location, data.state,
//     data.job_role, data.experience, data.current_company, data.highest_education, JSON.stringify(data.key_skills),
//     data.linkedin_url, data.portfolio_url, data.github_url, data.notice_period, data.expected_salary,
//     id
//   ];
//   const [result] = await db.execute(query, values);
//   return result;
// };

// // DELETE
// export const deleteCandidate = async (id) => {
//   const [result] = await db.execute("DELETE FROM candidates WHERE id = ?", [id]);
//   return result;
// };