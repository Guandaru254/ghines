// C:\Users\PC\Desktop\Companies\Ghenis\frontend\components\PageTitle\PageTitle.js
import React from 'react';
import styles from './page-title.module.scss'; 

const PageTitle = ({ pageTitle }) => {
    return (
        <section className={styles.pageTitleWrapper}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={styles.breadcumbWrap}>
                            <h1 className={styles.pageMainTitle}>{pageTitle}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default PageTitle;