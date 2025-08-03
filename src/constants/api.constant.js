export const ApiConstant = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    verifyTempPassword: '/auth/temp-password',
    refreshToken: '/auth/refresh-token',
  },
  users: {
    base: '/users',
    baseId: '/users/',
    baseId: '/users/',
    getCurrentUser: '/users/me',
    getMyClassrooms: '/users/me/classrooms',
    getMyCompetitions: '/users/me/competitions',
    getLeaders:'/users/leaders'
  },
  classrooms: {
    base: '/classrooms',
    getById: '/classrooms/',
    members: '/classrooms/',
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
  },
  commentPosts: {
    base: '/comment-posts',
    getById: '/comment-posts/',
  },
}
