const HeadingText =
        'Our objective is to provide a platform to share experiences ' +
        'and facilitate the exchange of ideas and expertise on conflict' +
        ' resolution techniques in the Indian context.'

const Author = () => {
        return (
                <span className="font-bold"> Dr. Jyoti M. Pathania </span>
        )
}

const AboutText = () => {
        return (
                <span>
                        It is an irony that ‘India – the Land of Ahimsa and Peace’, has very few centre pursuing Peace Studies and promoting the development of skills for conflict resolution.
                        ‘Online Indian Journal of Peace and Conflict Resolution’ is a novel initiative started by
                        <Author /> 
                        in March 2016, to study, examine and analyse the multifarious methods, mechanisms and theories of conflict resolution used by organizations, institutions, social activists, academicians, individuals and practitioners. 
                        <br></br>
                        <br></br>
                        <b>Aim and Scope</b> 
                        <br></br>
                        This journal will collate successful models and practices which could be referred to or tried out in similar cases/areas of dispute/conflict, thus positively contributing and helping in the creation of a peaceful society and Nation. The Journal shall be an annual feature and solicits contribution of commentaries on factual cases as well as articles of academic or theoretical nature on the subject, which will be reviewed and published for understanding and dealing with conflict situations and furtherance of peace studies.
                </span >
        )
}


export { HeadingText, AboutText }