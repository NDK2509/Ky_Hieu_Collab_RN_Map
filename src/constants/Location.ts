const DEFAULT_DELTA = { latitudeDelta: 0.0421, longitudeDelta: 0.0421 };
const CLOSED_VIEW_DELTA = { latitudeDelta: 0.009, longitudeDelta: 0.009 };
const WIDE_VIEW_DELTA = { latitudeDelta: 0.001, longitudeDelta: 0.1 };
const DEFAULT_REGION = {
	latitude: 16.060113,
	longitude: 108.243332,
	...DEFAULT_DELTA
};
export { DEFAULT_REGION, DEFAULT_DELTA, CLOSED_VIEW_DELTA, WIDE_VIEW_DELTA };
