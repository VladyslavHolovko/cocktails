const observe = (target, callback) => {
    const handleObserver = (entities) => {
        const currTarget = entities[0];
        if (currTarget.isIntersecting) {
            callback();
        }
    }

    const observer = new IntersectionObserver(handleObserver, {
        rootMargin: '3%',
        threshold: 0.9
    });

    if (target) {
        observer.observe(target);
    }
}

export default observe;