import { getPostsByClassroomId } from '../apis/post.api'

export const ApiConstant = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    verifyTempPassword: '/auth/temp-password',
    refreshToken: '/auth/refresh-token',
    changePassword: '/auth/change-password',
    verifyPassword: '/auth/verify-password',
  },
  users: {
    base: '/users',
    getById: (userId) => `/users/${userId}`,
    getCurrentUser: '/users/me',
    getMyClassrooms: '/users/me/classrooms',
    getMyCompetitions: '/users/me/competitions',
    getLeaders: '/users/leaders',
    updateRole: '/users/role',
    getMyPosts: '/users/me/posts',
    getUserClasses: (userId) => `/users/${userId}/classrooms`,
    resetPassword: (userId) => `/users/${userId}/reset-password`,
  },
  classrooms: {
    base: '/classrooms',
    getById: (classroomId) => `/classrooms/${classroomId}`,
    members: (classroomId) => `/classrooms/${classroomId}/members`,
    nonMembers: (classroomId) => `/classrooms/${classroomId}/non-members`,
    getManaged: '/classrooms/by-leader',
  },
  lessons: {
    base: '/lesson',
    getById: (lessonId) => `/lesson/${lessonId}`,
    getByClassroomId: (classroomId) => `/lesson/classroom/${classroomId}`,
    getMyLessons: '/lesson/my-lessons',
  },
  notifications: {
    base: '/notifications',
    getById: (notificationId) => `/notifications/${notificationId}`,
    getByClassroomId: (classroomId) => `/notifications/classrooms/${classroomId}`,
  },
  posts: {
    base: '/posts',
    getById: (postId) => `/posts/${postId}`,
    getByClassroomId: (classroomId) => `classrooms/${classroomId}/posts`,
  },
  competitions: {
    base: '/competitions',
    getById: (competitionId) => `/competitions/${competitionId}`,
  },
  competitionUsers: {
    join: '/competition-users/join',
    addMultipleMembers: '/competition-users/add-multiple',
    removeMultipleMembers: '/competition-users/remove-multiple',
    getMembers: (competitionId) => `/competition-users/${competitionId}/members`,
    getNonMembers: (competitionId) => `/competition-users/${competitionId}/non-members`,
  },
  commentPosts: {
    base: '/comment-posts',
    getById: (commentId) => `/comment-posts/${commentId}`,
  },
  images: {
    base: '/images',
  },
}
