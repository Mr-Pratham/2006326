import React from 'react';

function Footer() {
    const date = new Date();
    const TodayDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    return (<footer>
        <p>Today's date - {TodayDate}</p>
    </footer>
    );
}
export default Footer;