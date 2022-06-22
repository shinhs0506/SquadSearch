const events = [
    {
        name: 'Event1',
        location: 'Vancouver, BC',
        Date: 'Sept 4th, 2022',
    },
];

const getAllEvents = async (req, res) => {
    res.json(events);
};

exports.getAllEvents = getAllEvents;
