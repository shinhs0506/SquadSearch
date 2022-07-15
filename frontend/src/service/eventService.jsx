import { useDispatch } from 'react-redux';

import { eventSliceActions } from 'redux/slices/eventSlice';

const useGetEvents = () => {
    const dispatch = useDispatch();

    const getAllEvents = async () => {
        dispatch(eventSliceActions.getAllEvents());
    };

    return getAllEvents;
};

export default useGetEvents;
