import React from 'react';

class TimeLabel extends React.Component {
    calculateTimeDiff(createdAt, current = new Date()) {

        console.log("생성날짜 확인", createdAt)
        // createdAt 파라미터를 ISO 8601 형식으로 파싱합니다. 마이크로초 단위는 무시합니다.
        const createdAtDate = new Date(createdAt);
        const currentTime = current;
        const diffInMs = currentTime - createdAtDate;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);

        if (diffInMinutes < 1) return '방금';
        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
        if (diffInHours < 24) return `${diffInHours}시간 전`;
        if (diffInDays < 7) return `${diffInDays}일 전`;
        if (diffInWeeks < 4) return `${diffInWeeks}주 전`;
        return '한달 전';
    }

    render() {
        const { createdAt, current } = this.props;
        return <div>{this.calculateTimeDiff(createdAt, current)}</div>;
    }
}

export default TimeLabel;
