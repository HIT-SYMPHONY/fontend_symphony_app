export const ApiConstant = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    verifyTempPassword: '/auth/temp-password',
    refreshToken: '/auth/refresh-token',
  },
  users: {
    base: '/users',
    getById: '/users/',
    getCurrentUser: '/users/me',
    getMyClassrooms: '/users/me/classrooms',
    getMyCompetitions: '/users/me/competitions',
  },
  classrooms: {
    base: '/classrooms',
    getById: '/classrooms/',
    members: '/classrooms/{id}/members',
  },
  lessons: {
    base: '/lesson',
    getById: '/lesson/',
    getByClassroomId: '/lesson/classroom/',
    getMyLessons: '/lesson/my-lessons',
  },
  notifications: {
    base: '/notifications',
    getById: '/notifications/',
  },
  posts: {
    base: '/posts',
    getById: '/posts/',
  },
  competitions: {
    base: '/competitions',
    getById: '/competitions/',
    addMultipleMembers: '/competition-users/add-multiple',
    removeMultipleMembers: '/competition-users/remove-multiple',
    getMembers: '/competition-users/',
    getNonMembers: '/competition-users/',
  },
  commentPosts: {
    base: '/comment-posts',
    getById: '/comment-posts/',
  },
}
