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
        `University life carries with it a lot of stress. Yet given Rice's consistent placement at the top of national
            “happiest student” rankings, many believe that mental health concerns are not relevant to our students.`,
        `This couldn't be more false — surveys conducted every few years indicate that our student body closely
        follows nationwide trends in many aspects of mental health. Consequently, the university offers a plethora
        of resources, such as the Wellbeing Office, the Counseling Center, and Student Health Services, to address
        student needs when they inevitably arise.`,
        `Nevertheless, the characterization of Rice's campus as one filled with the “happiest students” in the country
        can make seeking help from these resources feel like a stigmatizing, shameful, and isolating experience.
        Compounded by stories of Rice student services breaching confidentiality and compelling students to unenroll
        or take time off in response to self-reported mental health concerns, the clear need for streamlined, anonymous
        mental health access on campus arises.`,
        `cRICEsis Averted responds to this problem by offering secure, intelligent, and anonymous access to Rice's mental
        health services. Our site enables people facing any type of mental health crisis to interact with a chatbot that
        directs them to either (1) RUPD/REMS/988 in the case of a life-threatening, serious crisis; (2) an appointment
        with the most appropriate on-campus organization to meet their specific needs; or (3) a real-time chatting
        session with a Rice-employed mental health professional or verified student volunteer, with the option for
        video chat as well.`,
        `cRICEis Averted uses ECDH encryption for key exchange. AES-GCM is then used for symmetric encryption of messages.
        Voice and video calls are encrypted and hosted on Jitsi. All messages with the bot are stored on device, and all
        student user accounts are anonymous.`,
        `Through cRICEsis Averted, we hope to deconstruct the stigma surrounding mental health outreach on campus,
        enable more efficient navigation of Rice's resources, and dismantle other security-related challenges
        uniquely facing Rice students in their journey to prioritize mental health.`
    ]
</script>

<div class="p-4">
    <h1>About</h1>
    {#each paragraphs as p}
        <div class="opacity-0 transition-opacity duration-1000">
            <p class="my-12 text-3xl">
                {p}
            </p>
            <div class="divider"></div> 
        </div>
    {/each}
</div>