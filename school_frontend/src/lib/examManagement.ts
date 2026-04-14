import api, { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/api`;

export interface ExamSubject {
  subject: string;
  date: string;
  time: string;
  duration: string;
}

export interface ExamSchedule {
  examName: string;
  examDate: string;
  classname: string; // Class for which this exam schedule is configured
  subjects: ExamSubject[];
  allowStudentDownload: boolean; // Admin can enable/disable student access
}

export interface AdmitCardAccess {
  studentId: string;
  allowed: boolean;
  allowedDate?: string;
}

// Get Exam Schedule from API
export const getExamSchedule = async (classname?: string): Promise<ExamSchedule | null> => {
  try {
    const url = classname 
      ? `/api/exams/schedule?classname=${encodeURIComponent(classname)}`
      : `/api/exams/schedule`;
      
    const { data } = await api.get(url);
    
    const schedule = Array.isArray(data) ? (data.length > 0 ? data[0] : null) : data;
    return schedule;
  } catch (error) {
    console.error("Error loading exam schedule:", error);
    return null;
  }
};

// Save Exam Schedule to API
export const saveExamSchedule = async (schedule: ExamSchedule): Promise<boolean> => {
  try {
    await api.post('/api/exams/schedule', schedule);
    return true;
  } catch (error) {
    console.error("Error saving exam schedule:", error);
    return false;
  }
};

// Get Admit Card Access Status
export const getAdmitCardAccess = async (studentId: string): Promise<boolean> => {
  try {
    const { data: accessList } = await api.get('/api/exams/admit-card-access');
    const access = accessList.find((a: AdmitCardAccess) => a.studentId === studentId);
    return access ? access.allowed : false;
  } catch (error) {
    console.error("Error loading admit card access:", error);
    return false;
  }
};

// Set Admit Card Access for Student (API Version)
export const setAdmitCardAccess = async (studentId: string, allowed: boolean): Promise<boolean> => {
  try {
    await api.post('/api/exams/access', { studentId, allowed });
    return true;
  } catch (error) {
    console.error("Error saving admit card access:", error);
    return false;
  }
};

// Allow All Students (API Version)
export const allowAllStudents = async (studentIds: string[]): Promise<boolean> => {
  try {
    await api.post('/api/exams/access/all', { studentIds });
    return true;
  } catch (error) {
    console.error("Error allowing all students:", error);
    return false;
  }
};

// Get All Access Status from API
export const getAllAdmitCardAccess = async (): Promise<AdmitCardAccess[]> => {
  try {
    const { data } = await api.get('/api/exams/access');
    return data;
  } catch (error) {
    console.error("Error loading all admit card access:", error);
    return [];
  }
};














