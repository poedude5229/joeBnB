// import { spotReviews } from "../../store/reviews";

// function getSpotReviews() {
//   let dispatch = useDispatch();
//   let { spotId } = useParams();
//   let reviews = useSelector((state) => state.reviews);
//   reviews = Object.values(reviews);

//   let sessionUser = useSelector((state) => state.session.user?.id);
//   let spot = useSelector((state) => state.spots?.[spotId].ownerId);
//   useEffect(() => {
//     dispatch(spotReviews(spotId));
//   });
// }
