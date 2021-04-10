const router = require('express').Router();
const lectureReponseRoutes = require('../controllers/lectureResponseController');

router.get('/report/:meetId/:userId/:date', lectureReponseRoutes.getSingleResponse);

router.get('/:meetId/:date', lectureReponseRoutes.getLectureResponses);

router.put('/:meetId/:date', lectureReponseRoutes.initLectureResponse);

router.patch(
  '/:meetId/:date/response',
  lectureReponseRoutes.UpdateResponseOnAnswer
);

router.patch(
  '/:meetId/:date/disconnect',
  lectureReponseRoutes.UpdateResponseOnDisconnect
);

module.exports = router;
