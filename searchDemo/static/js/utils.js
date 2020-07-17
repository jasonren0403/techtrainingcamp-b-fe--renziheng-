function scrollAnimation(currentY, targetY) {
	// 获取当前位置方法
	// const currentY = document.documentElement.scrollTop || document.body.scrollTop

	// 计算需要移动的距离
	let needScrollTop = targetY - currentY
	let _currentY = currentY
	setTimeout(() => {
		// 一次调用滑动帧数，每次调用会不一样
		const dist = Math.ceil(needScrollTop / 10)
		_currentY += dist
		window.scrollTo(_currentY, currentY)
		// 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
		if (needScrollTop > 10 || needScrollTop < -10) {
			scrollAnimation(_currentY, targetY)
		} else {
			window.scrollTo(_currentY, targetY)
		}
	}, 1)
}

function debounce(func, wait, immediate) {
	let timeout;
	return function () {
		let ctx = this;
		let args = arguments;

		if (timeout) clearTimeout(timeout);
		if (immediate) {
			// 如果已经执行过，不再执行
			let callNow = !timeout;
			timeout = setTimeout(() => {
				timeout = null;
			}, wait)
			if (callNow) func.apply(ctx, args);
		} else {
			timeout = setTimeout(function () {
				func.apply(ctx, args)
			}, wait)
		}
	}
}

function throttle(func, wait) {
	let timeout, ctx, args, result;
	let previous = 0;

	let later = function () {
		previous = +new Date();
		timeout = null;
		func.apply(ctx, args);
	}
	let throttled = function () {
		let now = +new Date();
		// 下次触发func剩余的时间
		let remaining = wait - (now - previous);
		ctx = this;
		args = arguments;
		// 如果没有剩余的时间了或者你改了系统时间
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func.apply(ctx, args);
		} else if (!timeout) {
			timeout = setTimeout(later, remaining);
		}
	};
	return throttled;
}


//导出待使用
module.exports = {
	scrollAnimation, debounce, throttle
}
