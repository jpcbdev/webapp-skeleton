import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Error() {

    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            router.push('/');
        }
        return () => { mounted: false };
    });

    return null;
}

export default Error;