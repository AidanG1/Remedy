<script lang="ts">
    import {onMount} from 'svelte';

    onMount(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100');
                    entry.target.classList.remove('opacity-0');
                } else {
                    entry.target.classList.remove('opacity-100');
                    entry.target.classList.add('opacity-0');
                }
            });
        });

        const targets = document.querySelectorAll('.opacity-0');
        targets.forEach(target => {
            observer.observe(target);
        });
    })

    

    const paragraphs: string[] = [
        `Immediate medical or psychiatric needs (24/7):
        (713) 348-6000: RUPD/REMS
        988: Suicide & Crisis Hotline`,
        `Wellbeing Office (9am - 5pm, M-F): 
        The Student Wellbeing Office supports student development and success by providing a good first point of contact for students who want to talk to someone about solutions to their wellbeing concerns. It connects with students in the residential colleges, graduate apartments, and other student spaces around campus to give advice and practical support to help students resolve personal challenges, such as conflicts with friends, difficulty making decisions, struggling with your identity, and academic concerns or problems that are more serious in nature.
        Wellbeing advising and case management
        Wellbeing advisor meetings to talk about your wellbeing concerns
        Options for medical/wellbeing separations and returns
        Support if you have experienced a personal struggle
        Connections with campus resources for counseling, reporting and other support services
        Contact them
        To schedule a Wellbeing Advising appointment click here.
        To schedule with the RCC, call 713-348-3311 during the hours of Monday - Friday, 9 AM - 5 PM
        Location: The Barbara and David Gibbs Wellness Center, 1st floor
        Hours: Monday through Friday, 9:00 AM–5:00 PM
        Phone: (713) 348-3311
        Email: wellbeing@rice.edu
        `,
        `Rice Counseling Center
        The clinical team at the RCC is a diverse team of psychologists, social workers, counselors, and consulting psychiatrists committed to providing professional, compassionate and individualized care. The RCC team provides assessment, short-term psychotherapy, and consultation services. 
        What they help with
        Family, friends and intimate relationships
        Self-Esteem
        Academic performances
        Problems with anxiety
        Sexual orientation
        Eating and body image concerns
        Race, ethnicity and cultural identity
        Bereavement
        Concerns about alcohol and/or drug abuse
        Feelings of sadness
        Contact them
        The Rice Counseling Center is open year round except for scheduled University holidays, several designated days during winter break, and occasional all day staff retreats or training. Emergency after-hours on-call services are available by telephone year round, 24 hours a day.
        Location: The Barbara and David Gibbs Wellness Center, 1st floor
        Hours: 9 AM - 5 PM, Monday through Friday
        Phone: (713) 348-3311 (24/7)
        Email: wellbeing@rice.edu
        `,
        `SAFE Office
        The SAFE Office: Interpersonal Misconduct Prevention and Support offers care management and navigation to students who are reporting an incident of interpersonal violence perpetrated against them and to students who have been accused of perpetrating interpersonal violence. The Office also provides prevention education to the Rice community on sexual and domestic violence, sexual harassment, stalking and Title IX and Clery Act requirements.
        What they help with:
        Emotional Support
        Education on healthy relationships, consent, and interpersonal violence dynamics
        Safety planning
        Information on reporting options
        Accompaniments to appointments
        Assistance with Supportive Measures
        Referrals to on and off campus resources
        Navigation support for reporting and responding students in Title IX related SJP cases
        Location: Morton L. Rich Student Health Center, Next to the Brown Magister's House
        Hours: 9 AM - 5 PM (Weekdays)
        Phone: 713-348-3311 (24/7)
        Email: titleixsupport@rice.edu
        `,
        `Student Health Services
        Student Health is located on-campus and is dedicated to meeting undergraduate and graduate students' unique needs, emphasizing prevention. They see all students regardless of insurance status. Appointments are included in student fees. Additional labs, vaccines, etc., charges may be paid via cash or credit card. Students are seen in person at student health.
        Location: Morton L. Rich Student Health Center, Next to the Brown Magister's House
        Hours:
        Fall and Spring Semesters: Monday - Friday, 8:00 a.m. - 5:00 p.m., closed for lunch 12:00-12:30 daily.
        Summer: Monday - Wednesday, 9:00 a.m. - 3:00 p.m.
        Closed Weekends
        Phone: (713) 348-4966
        `,
        `Rice Women's Resource Center
        The Rice Women's Resource Center is not only a space on the Rice University campus, but also a community that fosters personal relationships and conversations. Their vision is to increase awareness of and sensitivity to gender issues in order to build a more supportive, dynamic atmosphere on campus. Through a series of educational and social events and programs, they hope to actively engage with diverse identities and facilitate critical discussion of gender issues. The center also serves as an innovative platform and safe space for expression and development of philosophies and ideologies. 
        Location: Rice Memorial Center, Room 122 (Across from Coffeehouse)
        Hours: http://women.rice.edu/office-hours
        `,
        `
        Queer Resource Center
        The Queer Resource Center (QRC) is a meeting space with comfy chairs and beanbags and a library of queer books, including short stories, history, and fiction. The center is staffed by student volunteers trained in crisis intervention and resources available to LGBTQ+ students. Feel free to stop by and hang out with other queer students, study, get a Rice PRIDE sticker, or do a puzzle! Trainings to become a volunteer are held approximately every semester.
        Location: Rice Memorial Center, Room 11
        `,
        `
        Peer Resources
        Rice Health Advisors
        RHAs are students who have been trained on a variety of wellbeing topics. These students work at their college to provide health education opportunities, health supplies and peer guidance.
        RHAs by college
        Baker: https://www.baker-college.com/pager
        Will Rice: https://willrice.rice.edu/pages/rha.html 
        Hanszen: https://hanszen.rice.edu/resources/ 
        Wiess: http://www.teamwiess.com/resources/health-wellbeing 
        Jones: https://jones.rice.edu/resources 
        Brown: https://www.browncollege.org/rhas 
        Lovett:?
        Sid Rich:https://sidrich.rice.edu/health 
        Martel:https://www.martel.rice.edu/people/campus-representatives/resident-health-advisors/ 
        McMurtry:https://mcmurtry.rice.edu/people/RHAs 
        Duncan: https://duncancollege.notion.site/RHA-s-Rice-Health-Advisors-f8791e07068a431f8ef69c21837e2f1f 
        STRIVE Liaisons
        STRIVE Coalition is a dedicated group of students who have come together to address sexual and domestic violence on campus. The Coalition is made up of an executive board, STRIVE liaisons to colleges, STRIVE liaisons to graduate programs, STRIVE representatives in a variety of student groups, and volunteers. The Coalition is advised by the Office of Sexual Violence Prevention and Title IX Support.    
        STRIVE Liaisons by college
        Baker: https://www.baker-college.com/strive
        Will Rice: https://willrice.rice.edu/pages/strive.html
        Hanszen: https://hanszen.rice.edu/resources/
        Wiess: http://www.teamwiess.com/resources/health-wellbeing
        Jones: https://jones.rice.edu/resources
        Brown: https://www.browncollege.org/strive-liaisons
        Lovett: http://www.lovett.rice.edu/people/striveliasons.php
        Sid Rich: https://sidrich.rice.edu/health
        Martel: https://www.martel.rice.edu/people/campus-representatives/strive-liaisons/
        McMurtry: https://mcmurtry.rice.edu/people/striveliaisons
        Duncan: https://duncancollege.notion.site/Strive-Liaisons-010c621ba8154c43b491475e681b8eba
        `,
        `
        The 5-4-3-2-1 grounding technique for anxiety
        This five-step exercise can be very helpful during periods of anxiety or panic by helping to ground you in the present when your mind is bouncing around between various anxious thoughts.
        https://insighttimer.com/blog/54321-grounding-technique/
        `,
        `
        Progressive muscle relaxation
        Progressive muscle relaxation is a non-pharmacological method of deep muscle relaxation, based on the premise that muscle tension is the body's psychological response to anxiety-provoking thoughts and that muscle relaxation blocks anxiety.
        https://www.anxietycanada.com/articles/how-to-do-progressive-muscle-relaxation/
        `,
        `
        DBIT TIPP
        Temperature, Intense Exercise, Paced breathing, and Paired muscle relaxation. This is a super easy skill to use in times of crisis or high emotional states like when you feel overwhelmed and your emotions are going to consume you.
        https://www.manhattancbt.com/archives/1452/dbt-tipp-skills/
        `
    ]
</script>

<div class="p-4">
    <h1>Resourcess</h1>
    {#each paragraphs as p}
        <div class="opacity-0 transition-opacity duration-1000">
            <p class="my-12 text-xl">
                {p}
            </p>
            <div class="divider"></div> 
        </div>
    {/each}
</div>
