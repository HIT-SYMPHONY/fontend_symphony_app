// src/constants/queryKeys.js

/**
 * ==========================================
 * USERS & AUTHENTICATION
 * ==========================================
 */
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (params) => [...userKeys.lists(), params],
  details: () => [...userKeys.all, 'detail'],
  detail: (id) => [...userKeys.details(), id],

  currentUser: () => [...userKeys.all, 'me'],
  leaders: () => [...userKeys.all, 'leaders'],
  userClasses: (userId) => [...userKeys.detail(userId), 'classrooms'],

  myClasses: (params) => [...userKeys.currentUser(), 'classrooms', params],
  myCompetitions: () => [...userKeys.currentUser(), 'competitions'],
}

/**
 * ==========================================
 * CLASSROOMS
 * ==========================================
 */
export const classroomKeys = {
  all: ['classrooms'],
  lists: () => [...classroomKeys.all, 'list'],
  list: (params) => [...classroomKeys.lists(), params],

  managed: (params) => [...classroomKeys.all, 'managed', params],

  details: () => [...classroomKeys.all, 'detail'],
  detail: (id) => [...classroomKeys.details(), id],

  members: (classroomId, params) => [
    ...classroomKeys.detail(classroomId),
    'members',
    params,
  ],
  nonMembers: (classroomId, params) => [
    ...classroomKeys.detail(classroomId),
    'nonMembers',
    params,
  ],
  notifications: (classroomId, params) => [
    ...classroomKeys.detail(classroomId),
    'notifications',
    params,
  ],
}

/**
 * ==========================================
 * LESSONS
 * ==========================================
 */
export const lessonKeys = {
  all: ['lessons'],
  details: () => [...lessonKeys.all, 'detail'],
  detail: (id) => [...lessonKeys.details(), id],

  myLessons: () => [...lessonKeys.all, 'me'],
  byClassroom: (classroomId, params) => [
    ...lessonKeys.all,
    'classroom',
    classroomId,
    params,
  ],
}

/**
 * ==========================================
 * POSTS
 * ==========================================
 */
export const postKeys = {
  all: ['posts'],
  details: () => [...postKeys.all, 'detail'],
  detail: (id) => [...postKeys.details(), id],

  myPosts: () => [...postKeys.all, 'me'],
  byClassroom: (classroomId, params) => [
    ...postKeys.all,
    'classroom',
    classroomId,
    params,
  ],
}

/**
 * ==========================================
 * POST COMMENTS
 * ==========================================
 */
export const commentPostKeys = {
  all: ['commentPosts'],
  details: () => [...commentPostKeys.all, 'detail'],
  detail: (id) => [...commentPostKeys.details(), id],

  byPost: (postId, params) => [...commentPostKeys.all, 'post', postId, params],
  myCommentInPost: (postId) => [...commentPostKeys.byPost(postId), 'me'],
}

/**
 * ==========================================
 * COMPETITIONS
 * ==========================================
 */
export const competitionKeys = {
  all: ['competitions'],
  lists: () => [...competitionKeys.all, 'list'],
  list: (params) => [...competitionKeys.lists(), params],

  details: () => [...competitionKeys.all, 'detail'],
  detail: (id) => [...competitionKeys.details(), id],
}

/**
 * ==========================================
 * COMPETITION USERS (Members)
 * ==========================================
 */
export const competitionUserKeys = {
  all: ['competitionUsers'],

  members: (competitionId, params) => [
    ...competitionUserKeys.all,
    competitionId,
    'members',
    params,
  ],
  nonMembers: (competitionId, params) => [
    ...competitionUserKeys.all,
    competitionId,
    'nonMembers',
    params,
  ],
}

/**
 * ==========================================
 * COMPETITION COMMENTS
 * ==========================================
 */
export const commentCompetitionKeys = {
  all: ['commentCompetitions'],
  details: () => [...commentCompetitionKeys.all, 'detail'],
  detail: (id) => [...commentCompetitionKeys.details(), id],

  byCompetition: (competitionId) => [
    ...commentCompetitionKeys.all,
    'competition',
    competitionId,
  ],
  myComment: (competitionId) => [
    ...commentCompetitionKeys.byCompetition(competitionId),
    'me',
  ],
}

/**
 * ==========================================
 * NOTIFICATIONS
 * ==========================================
 */
export const notificationKeys = {
  all: ['notifications'],
  myNotifications: (params) => [...notificationKeys.all, 'me', params],
}
