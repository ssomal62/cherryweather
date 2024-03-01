import React from 'react';

class TimeLabel extends React.Component {
    calculateTimeDiff(createdAt, current = new Date()) {
        const createdAtDate = new Date(createdAt);
        const currentTime = current;
        const diffInMs = currentTime - createdAtDate;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);

        if (diffInMinutes < 1) return '방금';
        if (diffInMinutes < 60) return diffInMinutes >= 30 ? '30분 전' : '방금';
        if (diffInHours < 2) return '1시간 전';
        if (diffInHours < 3) return '2시간 전';
        if (diffInHours < 6) return '3시간 전';
        if (diffInHours < 24) return '6시간 전';
        if (diffInDays < 2) return '1일 전';
        if (diffInDays < 7) return '2일 전';
        if (diffInWeeks < 4) return '일주일 전';
        return '한달 전';
    }

    render() {
        const { createdAt, current } = this.props;
        return <div>{this.calculateTimeDiff(createdAt, current)}</div>;
    }
}

export default TimeLabel;
