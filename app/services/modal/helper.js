import style from './style.scss';

export const CROP_CLASS = style.crop;
export const LOCK_CLASS = `modal-lock-${Date.now()}`;
export const DATA_LEFT = 'data-left';
export const DATA_TOP = 'data-top';

export function getBodyJqEl() {
    const bodyJqEl = angular.element(document).find('body');

    if (bodyJqEl[0] === undefined) {
        throw new TypeError('<body></body> not found');
    }

    return bodyJqEl;
}

export function getHeadJqEl() {
    const headJqEl = angular.element(document).find('head');

    if (headJqEl[0] === undefined) {
        throw new TypeError('<head></head> not found');
    }

    return headJqEl;
}

export function cropBody() {
    getBodyJqEl().addClass(CROP_CLASS);
}

export function uncropBody() {
    getBodyJqEl().removeClass(CROP_CLASS);
}

export function getLockBodyStyleTag(left, top) {
    return [
        `<style type='text/css' id="${LOCK_CLASS}">`,
        `.${LOCK_CLASS} {`,
        `left: ${-1 * left}px;`,
        `top: ${-1 * top}px;`,
        '}',
        '</style>',
    ].join('');
}

export function getInfoToLockBody() {
    const { pageXOffset, pageYOffset } = window;
    const {
        scrollLeft,
        clientLeft,
        scrollTop,
        clientTop,
    } = document.documentElement;

    const left = (pageXOffset || scrollLeft) - (clientLeft || 0);
    const top = (pageYOffset || scrollTop) - (clientTop || 0);

    const lockBodyStyleTag = getLockBodyStyleTag(left, top);

    return { left, top, lockBodyStyleTag };
}

export function lockBody() {
    const { left, top, lockBodyStyleTag } = getInfoToLockBody();

    getHeadJqEl().append(lockBodyStyleTag);

    const bodyJqEl = getBodyJqEl();

    bodyJqEl.attr(DATA_LEFT, left);
    bodyJqEl.attr(DATA_TOP, top);
    bodyJqEl.addClass(LOCK_CLASS);
}

export function unlockBody() {
    const left = parseInt(getBodyJqEl().attr(DATA_LEFT), 10);
    const top = parseInt(getBodyJqEl().attr(DATA_TOP), 10);

    angular.element(document.getElementById(`${LOCK_CLASS}`)).remove();

    const bodyJqEl = getBodyJqEl();

    bodyJqEl.removeAttr(DATA_LEFT);
    bodyJqEl.removeAttr(DATA_TOP);
    bodyJqEl.removeClass(LOCK_CLASS);

    window.scrollTo(left, top);
}
