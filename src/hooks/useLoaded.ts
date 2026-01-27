import { useEffect, useEffectEvent, useState } from 'react';

export const useLoaded = () => {
	const [loaded, setLoaded] = useState(false);

	const loadedEffect = useEffectEvent(() => setLoaded(true));

	useEffect(() => {
		loadedEffect();
	}, []);

	return loaded;
};
