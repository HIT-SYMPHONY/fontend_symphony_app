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
    baseId: '/users/',
    getCurrentUser: '/users/me',
    getMyClassrooms: '/users/me/classrooms',
    getMyCompetitions: '/users/me/competitions',
    getLeaders: '/users/leaders',
    updateRole: '/users/role',
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
    getByClassroomId: '/notifications/classrooms/',
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
  competitionUsers: {
    join: '/competition-users/join',
  },
  commentPosts: {
    base: '/comment-posts',
    getById: '/comment-posts/',
  },
  leader: {
    base: '',
  },
}
