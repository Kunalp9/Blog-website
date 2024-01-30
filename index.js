import express from "express";
import bodyparser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.static('public'));

let educational= [
    {
        title: "How to code",
        author: "Anurag Lokhande",
        description:"\In the ever-expanding realm of technology, web development stands as the backbone of our digital experiences. From static web pages to dynamic applications, the journey of web development has been nothing short of revolutionary. \n \nWeb development involves two main aspects: frontend and backend. The frontend deals with the visual and interactive elements users experience, driven by HTML, CSS, and JavaScript. On the flip side, the backend manages server-side logic, databases, and application functionality using languages like Python, Node.js, or PHP.\n\nThe impact of web development on our lives is undeniable. Social media, e-commerce, and collaborative platforms owe their existence to the innovative minds behind web development. Businesses, small and large, leverage it to establish an online presence, connect with global audiences, and streamline operations.\n\nYet, web development is a field in constant flux. New frameworks, libraries, and paradigms emerge, bringing forth trends like Progressive Web Apps and serverless architecture. The future promises even more exciting developments, with artificial intelligence and machine learning poised to play pivotal roles.\n\nIn essence, web development is not just about lines of code; it's about crafting digital experiences that shape our interconnected world. As we navigate the ever-evolving landscape of technology, web development remains the driving force behind the digital future we're collectively building."
    },
    {
        title: "Safeguarding the Digital Realm: The Imperative of Cyber Security",
        author: "Pranav Patil",
        description:"In an era dominated by digital interconnectedness, the significance of cyber security has become more critical than ever. The ubiquity of technology has revolutionized the way we live and work, but it has also opened a Pandora's box of cyber threats that transcend borders and impact individuals, businesses, and governments globally. The ever-evolving landscape of cybercrime demands a proactive and multifaceted approach to ensure the protection of sensitive information and the integrity of digital systems.Cyber security is not merely a matter of installing antivirus software or using strong passwords; it's a comprehensive strategy encompassing education, awareness, and cutting-edge technologies. Individuals must be vigilant against phishing attempts, while organizations must fortify their defenses against increasingly sophisticated cyber attacks. The rapid pace of technological advancements means that cyber security is not a one-size-fits-all solution but a dynamic and adaptive process.From ransomware attacks targeting critical infrastructure to data breaches compromising personal information, the consequences of lax cyber security are severe. As we navigate the intricacies of the digital age, the onus is on us to prioritize cyber security as an integral part of our daily lives. Through constant vigilance, education, and the implementation of robust security measures, we can collectively build a resilient defense against the ever-present threats in the vast and complex realm of cyberspace."
    }
];


let sports= [
    {
        title: "The Thrill of Football: A Global Passion",
        author: "Kunal Pawar",
        description: "Football, the beautiful game, transcends borders and languages, uniting millions worldwide in a shared passion. From the grandeur of the World Cup to the intensity of local rivalries, the sport creates a global spectacle that captivates hearts. It's a melting pot of cultures, showcasing diversity and fostering camaraderie among players and fans. The unpredictability of football, with its last-minute goals and underdog victories, adds an exhilarating edge to every match. In those 90 minutes, the world comes together in celebration of skill, teamwork, and the sheer joy that only football can deliver."
    }
];
let fitness= [
    {
        title: "Embracing the Grind: The Gym as a Wellness Haven",
        author: 'Anuj Abhang',
        description: "The gym, a sanctuary for body and mind, transforms into a space where self-improvement takes center stage. Beyond the clinking of weights and rhythmic beats, it's a haven for those seeking physical and mental well-being. Each drop of sweat becomes a testament to dedication, pushing limits and sculpting strength. The gym fosters a community of individuals chasing health goals, creating an environment of mutual support. From cardiovascular triumphs to the victorious completion of a challenging set, the gym is a celebration of resilience. It's not just a place to exercise; it's a journey of transformation, empowering each person to become their best self."
    }
];
let food= [
    {
        title: "Food for thought : Kitchen Essentials",
        author: "Kaga",
        description: "foooooooooooddddd"
    }
];


app.get('/', (req, res)=>{
    res.render("index.ejs",{educational});
})

app.get('/create', (req, res)=>{
    res.render("create.ejs");

})

app.post('/', (req, res)=> {
    let title = req.body.title;
    let author = req.body.author;
    let description = req.body.description;
    let subgroup = req.body.subgroup;
    switch (subgroup) {
        case "fitness":
            fitness.push({
                title: title,
                author: author,
                description: description
            })
            break;
        case "food":
            food.push({
                title: title,
                author: author,
                description: description
            })
            break;
        case "sports":
            sports.push({
                title: title,
                author: author,
                description: description
            })
            break;
    
        default:
            educational.push({
                title: title,
                author: author,
                description: description
            })
            break;
    };
    res.render('index.ejs',{educational})
})

app.get('/about', (req, res)=>{
    res.render("about.ejs");
})

//get requests for handling the blog sub groups
app.get('/fitness', (req, res)=> {
    res.render('fitness.ejs',{fitness});
})

app.get('/food', (req, res)=> {
    res.render('food.ejs', {food});
})

app.get('/sports', (req, res)=> {
    res.render('sports.ejs', {sports});
})

//for blogs content
app.get(`/educational:id(\\d+)`, (req, res)=> {
    let blogNum = req.params.id;
    console.log(req.params);
    res.render('blog.ejs', {
        blogNum: blogNum,
        data: educational,
    })
})

app.get(`/sports:id`, (req, res)=> {
    const blogNum = req.params.id;
    res.render('blog.ejs', {
        blogNum,
        data: sports,
    })
})

app.get(`/fitness:id`, (req, res)=> {
    const blogNum = req.params.id;
    res.render('blog.ejs', {
        blogNum,
        data: fitness,
    })
})

app.get(`/food:id`, (req, res)=> {
    const blogNum = req.params.id;
    res.render('blog.ejs', {
        blogNum,
        data: food,
    })
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})