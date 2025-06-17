function generateProtocol(child, pastSessions) {

    // --- 1. Randomly Select Condition & Counterbalance Details ---
    const mainStudyTypes = ["CD", "Cx", "xD"];
    const conditionTypes = ["group", "pref"];

    const selectedMainStudyType = mainStudyTypes[Math.floor(Math.random() * mainStudyTypes.length)];
    const selectedConditionType = conditionTypes[Math.floor(Math.random() * conditionTypes.length)];

    const group_naming_keys = ["CB01", "CB02", "CB05", "CB06", "CB09", "CB10", "CB13", "CB14"];
    const pref_naming_keys = ["CB01", "CB03", "CB05", "CB07", "CB09", "CB11", "CB13", "CB15"];

    const group_naming_map = {
        "CB01": "group_Kiki_Red_Kiki_Red", "CB02": "group_Kiki_Blue_Kiki_Red",
        "CB05": "group_Kiki_Red_Kiki_Blue", "CB06": "group_Kiki_Blue_Kiki_Blue",
        "CB09": "group_Kiki_Red_Bubba_Red", "CB10": "group_Kiki_Blue_Bubba_Red",
        "CB13": "group_Kiki_Red_Bubba_Blue", "CB14": "group_Kiki_Blue_Bubba_Blue"
    };
    const pref_naming_map = {
        "CB01": "pref_Kiki_Red_Kiki_Red", "CB03": "pref_Bubba_Red_Kiki_Red",
        "CB05": "pref_Kiki_Red_Kiki_Blue", "CB07": "pref_Bubba_Red_Kiki_Blue",
        "CB09": "pref_Kiki_Red_Bubba_Red", "CB11": "pref_Bubba_Red_Bubba_Red",
        "CB13": "pref_Kiki_Red_Bubba_Blue", "CB15": "pref_Bubba_Red_Bubba_Blue"
    };

    let selectedCbKey;
    let namingString;
    if (selectedConditionType === "group") {
        selectedCbKey = group_naming_keys[Math.floor(Math.random() * group_naming_keys.length)];
        namingString = group_naming_map[selectedCbKey];
    } else { // pref
        selectedCbKey = pref_naming_keys[Math.floor(Math.random() * pref_naming_keys.length)];
        namingString = pref_naming_map[selectedCbKey];
    }

    const parts = namingString.split('_');
    const fruitPresentedFirst = parts[3];
    const teamPresentedFirst = parts[4];

    // Store dynamic conditions on child object for access in generateProperties
    child.study = child.study || {};
    child.study.conditions = child.study.conditions || {};
    child.study.conditions.teamPresentedFirst = teamPresentedFirst;
    child.study.conditions.fruitPresentedFirst = fruitPresentedFirst; // Added for fruit why question


    // --- 2. Determine Specific Stimuli Filenames & Dynamic Logic ---
    const introGazorpsVid = teamPresentedFirst === "Red" ? "intro_gazorps_red" : "intro_gazorps_blue";
    const introFruitsVid = fruitPresentedFirst === "Kiki" ? "fruits_kiki" : "fruits_bubba";

    const gazorpsTestBgImgFile = teamPresentedFirst === "Red" ? "gazorps_red.png" : "gazorps_blue.png";
    const fruitsTestBgImgFile = fruitPresentedFirst === "Kiki" ? "fruits_kiki.png" : "fruits_bubba.png";

    const snackTimeVidFileBase = `${selectedMainStudyType}_${selectedConditionType}_${selectedCbKey}`;
    // MODIFICATION: Create variables for Part 1 and Part 2 of the snack time video
    const snackTimeVidP1 = `${snackTimeVidFileBase}_P1`;
    const snackTimeVidP2 = `${snackTimeVidFileBase}_P2`;
    const snackTimeTestBgImgFile = `${snackTimeVidFileBase}_test.png`;

    const fruitChoiceQAudio = fruitPresentedFirst === "Kiki" ? "question_like_what_kiki" : "question_like_what_bubba";
    let teamChoiceQAudio;
    if (selectedConditionType === "pref") {
        teamChoiceQAudio = teamPresentedFirst === "Red" ? "question_team_red_pref" : "question_team_blue_pref";
    } else {
        teamChoiceQAudio = teamPresentedFirst === "Red" ? "question_team_red" : "question_team_blue";
    }

    let fruitChoiceLeftFeedback, fruitChoiceRightFeedback;
    if (fruitPresentedFirst === "Kiki") {
        fruitChoiceLeftFeedback = "kiki"; fruitChoiceRightFeedback = "bubba";
    } else {
        fruitChoiceLeftFeedback = "bubba"; fruitChoiceRightFeedback = "kiki";
    }

    let teamChoiceLeftFeedback, teamChoiceRightFeedback;
    if (teamPresentedFirst === "Red") {
        teamChoiceLeftFeedback = "red_team"; teamChoiceRightFeedback = "blue_team";
    } else {
        teamChoiceLeftFeedback = "blue_team"; teamChoiceRightFeedback = "red_team";
    }

    let tqr_correctChoice, tqr_leftCorrect, tqr_leftFeedback, tqr_rightFeedback;
    let tqb_correctChoice, tqb_leftCorrect, tqb_leftFeedback, tqb_rightFeedback;

    if (teamPresentedFirst === "Red") {
        tqr_correctChoice = 'left-choice'; tqr_leftCorrect = true; tqr_leftFeedback = "good_job"; tqr_rightFeedback = "incorrect_red";
        tqb_correctChoice = 'right-choice'; tqb_leftCorrect = false; tqb_leftFeedback = "incorrect_blue"; tqb_rightFeedback = "good_job";
    } else {
        tqr_correctChoice = 'right-choice'; tqr_leftCorrect = false; tqr_leftFeedback = "incorrect_red"; tqr_rightFeedback = "good_job";
        tqb_correctChoice = 'left-choice'; tqb_leftCorrect = true; tqb_leftFeedback = "good_job"; tqb_rightFeedback = "incorrect_blue";
    }

    let tqk_correctChoice, tqk_leftCorrect, tqk_leftFeedback, tqk_rightFeedback;
    let tqbuba_correctChoice, tqbuba_leftCorrect, tqbuba_leftFeedback, tqbuba_rightFeedback;

    if (fruitPresentedFirst === "Kiki") {
        tqk_correctChoice = 'left-choice'; tqk_leftCorrect = true; tqk_leftFeedback = "good_job"; tqk_rightFeedback = "incorrect_kiki";
        tqbuba_correctChoice = 'right-choice'; tqbuba_leftCorrect = false; tqbuba_leftFeedback = "incorrect_bubba"; tqbuba_rightFeedback = "good_job";
    } else {
        tqk_correctChoice = 'right-choice'; tqk_leftCorrect = false; tqk_leftFeedback = "incorrect_kiki"; tqk_rightFeedback = "good_job";
        tqbuba_correctChoice = 'left-choice'; tqbuba_leftCorrect = true; tqbuba_leftFeedback = "good_job"; tqbuba_rightFeedback = "incorrect_bubba";
    }

    const videoParentTextBlockCss = {
        'background-color': '#f8f3bf', 'width': '50vw', 'height': '16vh', 'margin': 'auto',
        'bottom': '2vh', 'right': '0', 'left': '0', 'position': 'fixed', 'padding': '10px 25px',
        'text-align': 'center', 'display': 'table-cell', 'vertical-align': 'middle', 'border-radius': '15px'
    };
    const videoParentTextBlockObj = {
        'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to watch the video carefully and press "Next" to continue if it pops up.',
        'fontSize': 'x-large',
        'css': videoParentTextBlockCss
    };
    const questionParentTextBlockObj = {
        'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to answer on their own and avoid guiding or influencing their thoughts about the video.'
    };
     const whyQuestionParentTextBlockObj = {
         'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to say their answer out loud. Once your child has given their answer, you may click Next to continue.'
    };

    const frames = {
        'video-config': { /* ... same ... */
            'kind': 'exp-video-config',
            'troubleshootingIntro': 'If you\'re having any trouble getting your webcam set up, please feel free to contact us for help!'
        },
        'video-consent': { /* ... same ... */
            'kind': 'exp-lookit-video-consent', 'template': 'consent_005', 'PIName': 'Researcher Name',
            'institution': 'Stanford University', 'PIContact': 'researcher@stanford.edu',
            'purpose': 'Investigating how children understand social group dynamics.',
            'procedures': 'Your child will watch short videos about characters in different groups.',
            'risk_statement': 'There are no anticipated risks to participating in this study.',
            'voluntary_participation': 'Participation is entirely voluntary, and you may exit at any time.',
            'payment': 'You\'ll receive a $5 gift card as thanks for your participation.',
            'datause': 'We\'ll analyze your child\'s reactions and responses to understand social cognition.',
            'include_databrary': true, 'gdpr': false,
            'research_rights_statement': 'For questions about your rights as a research participant, you may contact the Stanford IRB.'
        },
        'positioning': { /* ... same ... */
            'kind': 'exp-video-config-quality', 'title': 'Positioning',
            'introText': 'Let\'s get you and your child positioned comfortably.', 'showRecordMenu': false, 'requireTestVideo': false,
            'completedItemText': 'Got it!',
            'instructionBlocks': [
                {'text': 'You and your child can sit in any comfortable position.', 'title': 'Get comfortable'},
                {'text': 'Make sure your child\'s whole face is in view of the webcam.', 'title': 'Position yourselves'},
                {'text': 'Press the \'Next\' button when you\'re ready to continue.', 'title': 'When you\'re ready'}
            ],
            'nextButtonText': 'We\'re ready to start!', 'showPreviousButton': true, 'requireItemConfirmation': true, 'recordingInstructionText': ''
        },
        'start-recording': { /* ... same ... */ 'kind': 'exp-lookit-start-recording', 'imageAnimation': 'spin', 'displayFullscreen': true },
        'stop-recording': { /* ... same ... */ 'kind': 'exp-lookit-stop-recording', 'imageAnimation': 'spin', 'displayFullscreen': true },
        'exit-survey': { /* ... same ... */
            'kind': 'exp-lookit-exit-survey',
            'debriefing': {
                'title': 'Thank you for participating!',
                'blocks': [
                    {'title': '', 'text': 'This research wouldn\'t be possible without families like yours.'},
                    {'title': 'Study Purpose:', 'text': 'INSERT STUDY PURPOSE HERE'},
                    {'title': 'Compensation:', 'text': 'INSERT COMPENSATION DETAILS HERE'},
                    {'title': 'Questions?', 'text': 'INSERT CONTACT INFO FOR QUESTIONS HERE'}
                ]
            }
        },
        
        'intro-gazoom-fixed': { /* ... same ... */
            'kind': 'exp-lookit-video',
            'video': { 'top': 0, 'left': 0, 'width': 100, 'source': 'intro_gazoom', 'loop': false },
            'backgroundColor': 'black', 'autoProceed': true,
            'parentTextBlock': videoParentTextBlockObj,
            'showPreviousButton': false, 'showReplayButton': true, 'doRecording': false,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main', 'videoTypes': ['mp4']
        },
        'intro-gazorps-stim': { /* ... same ... */
            'kind': 'exp-lookit-video',
            'video': { 'top': 0, 'left': 0, 'width': 100, 'source': introGazorpsVid, 'loop': false },
            'backgroundColor': 'black', 'autoProceed': true,
            'parentTextBlock': videoParentTextBlockObj,
            'showPreviousButton': false, 'showReplayButton': true, 'doRecording': false,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main', 'videoTypes': ['mp4']
        },

        'test-question-red': {
            'kind': 'exp-lookit-images-audio',
            'images': [
                { "id": 'background', "src": gazorpsTestBgImgFile, "left": 0, "width": 100, "top": 0, "height": 100, 'maximizeDisplay': true, "nonChoiceOption": true },
                { "id": 'left-choice', "src": 'answer_rect_blank.png', "left": 16, "width": 30, "top": 49, "height": 50, "correct": tqr_leftCorrect, "feedbackAudio": tqr_leftFeedback },
                { "id": 'right-choice', "src": 'answer_rect_blank.png', "left": 57, "width": 30, "top": 49, "height": 50, "correct": !tqr_leftCorrect, "feedbackAudio": tqr_rightFeedback }
            ],
            'audio': 'question_click_red', 'audioTypes': ['mp3', 'ogg'], 'showReplayButton': true, 'choiceRequired': true,
            'correctChoice': tqr_correctChoice, 'correctChoiceRequired': true,
            'backgroundColor': 'black', 'pageColor': 'black', 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
            'parentTextBlock': questionParentTextBlockObj
        },

        'test-question-blue': {
            'kind': 'exp-lookit-images-audio',
            'images': [
                { "id": 'background', "src": gazorpsTestBgImgFile, "left": 0, "width": 100, "top": 0, "height": 100, 'maximizeDisplay': true, "nonChoiceOption": true },
                { "id": 'left-choice', "src": 'answer_rect_blank.png', "left": 16, "width": 30, "top": 49, "height": 50, "correct": tqb_leftCorrect, "feedbackAudio": tqb_leftFeedback },
                { "id": 'right-choice', "src": 'answer_rect_blank.png', "left": 57, "width": 30, "top": 49, "height": 50, "correct": !tqb_leftCorrect, "feedbackAudio": tqb_rightFeedback }
            ],
            'audio': 'question_click_blue', 'audioTypes': ['mp3', 'ogg'], 'showReplayButton': true, 'choiceRequired': true,
            'correctChoice': tqb_correctChoice, 'correctChoiceRequired': true,
            'backgroundColor': 'black', 'pageColor': 'black', 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
            'parentTextBlock': questionParentTextBlockObj
        },
        
        'intro-fruits-stim': { /* ... same, doRecording: false ... */
            'kind': 'exp-lookit-video',
            'video': { 'top': 0, 'left': 0, 'width': 100, 'source': introFruitsVid, 'loop': false },
            'backgroundColor': 'black', 'autoProceed': true,
            'parentTextBlock': videoParentTextBlockObj,
            'showPreviousButton': false, 'showReplayButton': true,
            'doRecording': false,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main', 'videoTypes': ['mp4']
        },

        'test-question-kiki': {
            'kind': 'exp-lookit-images-audio',
            'images': [
                { "id": 'background', "src": fruitsTestBgImgFile, "left": 0, "width": 100, "top": 0, "height": 100, 'maximizeDisplay': true, "nonChoiceOption": true },
                { "id": 'left-choice', "src": 'answer_rect_blank.png', "left": 17.5, "width": 30, "top": 4, "height": 92, "correct": tqk_leftCorrect, "feedbackAudio": tqk_leftFeedback },
                { "id": 'right-choice', "src": 'answer_rect_blank.png', "left": 54, "width": 30, "top": 4, "height": 92, "correct": !tqk_leftCorrect, "feedbackAudio": tqk_rightFeedback }
            ],
            'audio': 'question_click_kiki', 'audioTypes': ['mp3', 'ogg'], 'showReplayButton': true, 'choiceRequired': true,
            'correctChoice': tqk_correctChoice, 'correctChoiceRequired': true,
            'backgroundColor': 'black', 'pageColor': 'black', 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
            'parentTextBlock': questionParentTextBlockObj
        },

        'test-question-bubba': {
            'kind': 'exp-lookit-images-audio',
            'images': [
                { "id": 'background', "src": fruitsTestBgImgFile, "left": 0, "width": 100, "top": 0, "height": 100, 'maximizeDisplay': true, "nonChoiceOption": true },
                { "id": 'left-choice', "src": 'answer_rect_blank.png', "left": 17.5, "width": 30, "top": 4, "height": 92, "correct": tqbuba_leftCorrect, "feedbackAudio": tqbuba_leftFeedback },
                { "id": 'right-choice', "src": 'answer_rect_blank.png', "left": 54, "width": 30, "top": 4, "height": 92, "correct": !tqbuba_leftCorrect, "feedbackAudio": tqbuba_rightFeedback }
            ],
            'audio': 'question_click_bubba', 'audioTypes': ['mp3', 'ogg'], 'showReplayButton': true, 'choiceRequired': true,
            'correctChoice': tqbuba_correctChoice,
            'correctChoiceRequired': true,
            'backgroundColor': 'black', 'pageColor': 'black', 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
            'parentTextBlock': questionParentTextBlockObj
        },

        'snack-time-stim-p1': {
            'kind': 'exp-lookit-video',
            'video': { 'top': 0, 'left': 0, 'width': 100, 'source': snackTimeVidP1, 'loop': false },
            'backgroundColor': 'black', 'autoProceed': false,
            'parentTextBlock': videoParentTextBlockObj,
            'showPreviousButton': false, 'showReplayButton': true, 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main', 'videoTypes': ['mp4']
        },
        'snack-time-halfway': {
            'kind': 'exp-lookit-video',
            'video': { 'top': 0, 'left': 0, 'width': 100, 'source': 'gazorps_snacktime_halfway', 'loop': false },
            'backgroundColor': 'black', 'autoProceed': false,
            'parentTextBlock': videoParentTextBlockObj,
            'showPreviousButton': false, 'showReplayButton': true, 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main', 'videoTypes': ['mp4']
        },
        
        'snack-time-stim-p2': {
            'kind': 'exp-lookit-video',
            'video': { 'top': 0, 'left': 0, 'width': 100, 'source': snackTimeVidP2, 'loop': false },
            'backgroundColor': 'black', 'autoProceed': true,
            'parentTextBlock': videoParentTextBlockObj,
            'showPreviousButton': false, 'showReplayButton': true, 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main', 'videoTypes': ['mp4']
        },

        'test-question-fruit-choice': {
            'id': 'fruit-choice-question',
            'kind': 'exp-lookit-images-audio',
            'images': [
                { "id": 'background', "src": snackTimeTestBgImgFile, "left": 0, "width": 100, "top": 0, "height": 100, 'maximizeDisplay': true, "nonChoiceOption": true },
                { "id": 'left-choice', "src": 'answer_rect_blank.png', "left": 19, "width": 22, "top": 65.5, "height": 34, "correct": true },
                { "id": 'right-choice', "src": 'answer_rect_blank.png', "left": 59, "width": 22, "top": 65.5, "height": 34, "correct": true }
            ],
            'audio': fruitChoiceQAudio, 'audioTypes': ['mp3', 'ogg'], 'showReplayButton': true, 'choiceRequired': true,
            'backgroundColor': 'black', 'pageColor': 'black', 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
            'parentTextBlock': questionParentTextBlockObj
        },

        'test-question-team-choice': {
            'id': 'team-choice-question',
            'kind': 'exp-lookit-images-audio',
            'images': [
                { "id": 'background', "src": snackTimeTestBgImgFile, "left": 0, "width": 100, "top": 0, "height": 100, 'maximizeDisplay': true, "nonChoiceOption": true },
                { "id": 'left-choice', "src": 'answer_rect_blank.png', "left": 12, "width": 35, "top": 0, "height": 48, "correct": true },
                { "id": 'right-choice', "src": 'answer_rect_blank.png', "left": 53, "width": 35, "top": 0, "height": 48, "correct": true }
            ],
            'audio': teamChoiceQAudio, 'audioTypes': ['mp3', 'ogg'], 'showReplayButton': true, 'choiceRequired': true,
            'backgroundColor': 'black', 'pageColor': 'black', 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
            'parentTextBlock': questionParentTextBlockObj
        },
        
        'test-question-team-choice-why': {
            'kind': 'exp-lookit-images-audio',
            'images': [{ "id": 'background', "src": snackTimeTestBgImgFile, "left": 0, "width": 100, "top": 0, "height": 100, 'maximizeDisplay': true, "nonChoiceOption": true }],
            'audioTypes': ['mp3', 'ogg'], 
            'showReplayButton': true, 
            'choiceRequired': false, 
            'durationSeconds': 12,
            'backgroundColor': 'black', 
            'pageColor': 'black', 
            'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
            'parentTextBlock': whyQuestionParentTextBlockObj,
            'generateProperties': `function(expData, sequence, child, pastSessions) {
                let lastFrameData = null;
                let maxIndex = -1;
                for (const key in expData) {
                    if (expData.hasOwnProperty(key)) {
                        const index = parseInt(key.split('-')[0], 10);
                        if (!isNaN(index) && index > maxIndex) {
                            maxIndex = index;
                            lastFrameData = expData[key];
                        }
                    }
                }
                const choiceData = lastFrameData;
        
                let whyAudio = 'why_team_red'; // Default audio
        
                const localTeamPresentedFirst = (child.study && child.study.conditions && child.study.conditions.teamPresentedFirst)
                                                 ? child.study.conditions.teamPresentedFirst
                                                 : 'Red';
        
                if (choiceData && choiceData.selectedImage) {
                    const selection = choiceData.selectedImage;
                    let chosenTeam;
        
                    if (localTeamPresentedFirst === 'Red') {
                        chosenTeam = (selection === 'left-choice') ? 'Red' : 'Blue';
                    } else { // Blue team was presented first
                        chosenTeam = (selection === 'left-choice') ? 'Blue' : 'Red';
                    }
        
                    if (chosenTeam === 'Red') {
                        whyAudio = 'why_team_red';
                    } else {
                        whyAudio = 'why_team_blue';
                    }
                }
                
                return { "audio": whyAudio };
            }`
        },
        
        'test-question-fruit-choice-why': {
            'kind': 'exp-lookit-images-audio',
            'images': [{ "id": 'background', "src": snackTimeTestBgImgFile, "left": 0, "width": 100, "top": 0, "height": 100, 'maximizeDisplay': true, "nonChoiceOption": true }],
            'audioTypes': ['mp3', 'ogg'], 'showReplayButton': true, 'choiceRequired': false, 'durationSeconds': 12,
            'backgroundColor': 'black', 'pageColor': 'black', 'doRecording': true,
            'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
            'parentTextBlock': whyQuestionParentTextBlockObj,
            'generateProperties': `function(expData, sequence, child, pastSessions) {
                let lastFrameData = null;
                let maxIndex = -1;
                for (const key in expData) {
                    if (expData.hasOwnProperty(key)) {
                        const index = parseInt(key.split('-')[0], 10);
                        if (!isNaN(index) && index > maxIndex) {
                            maxIndex = index;
                            lastFrameData = expData[key];
                        }
                    }
                }
                const choiceData = lastFrameData;
            
                let whyAudio = 'why_likes_kiki'; // Default audio
            
                const localFruitPresentedFirst = (child.study && child.study.conditions && child.study.conditions.fruitPresentedFirst)
                                                 ? child.study.conditions.fruitPresentedFirst
                                                 : 'Kiki';
            
                if (choiceData && choiceData.selectedImage) {
                    const selection = choiceData.selectedImage;
                    let chosenFruit;
            
                    if (localFruitPresentedFirst === 'Kiki') {
                        chosenFruit = (selection === 'left-choice') ? 'Kiki' : 'Bubba';
                    } else {
                        chosenFruit = (selection === 'left-choice') ? 'Bubba' : 'Kiki';
                    }
            
                    if (chosenFruit === 'Kiki') {
                        whyAudio = 'why_likes_kiki';
                    } else {
                        whyAudio = 'why_likes_bubba';
                    }
                }
                
                return { "audio": whyAudio };
            }`
        }
    };

    // --- 4. Define Experimental Sequence based on conditionType ---
    let experimentalSequence;
    let whyBlockConditional; // This will hold the correct "why" question frame
    // MODIFICATION: Replaced 'snack-time-stim' with the new three-part sequence
    const coreStimulusBlock = [
        'intro-gazorps-stim', 'test-question-red', 'test-question-blue',
        'intro-fruits-stim', 'test-question-kiki', 'test-question-bubba',
        'snack-time-stim-p1', 'snack-time-halfway', 'snack-time-stim-p2'
    ];

    if (selectedConditionType === "group") {
        whyBlockConditional = ['test-question-team-choice-why'];
        experimentalSequence = [
            ...coreStimulusBlock,
            'test-question-fruit-choice',
            'test-question-team-choice',
            ...whyBlockConditional
        ];
    } else { // pref
        whyBlockConditional = ['test-question-fruit-choice-why'];
        experimentalSequence = [
            ...coreStimulusBlock,
            'test-question-team-choice',
            'test-question-fruit-choice',
            ...whyBlockConditional
        ];
    }

    const protocolSequence = [
        'video-config', 'video-consent', 'positioning', 'start-recording',
        'intro-gazoom-fixed',
        ...experimentalSequence,
        'stop-recording', 'exit-survey'
    ];

    // --- Logging for Debugging ---
    console.log("--- generateProtocol ---");
    console.log("Selected Main Study Type:", selectedMainStudyType);
    console.log("Selected Condition Type:", selectedConditionType);
    console.log("Selected CB Key:", selectedCbKey);
    console.log("Naming String:", namingString);
    console.log("Fruit Presented First (parts[3]):", fruitPresentedFirst, ", Team Presented First (parts[4]):", teamPresentedFirst);
    console.log("--- Stimuli & Dynamic Frame Vars ---");
    console.log("Intro Gazorps Video:", introGazorpsVid);
    console.log("Gazorps Test BG Img:", gazorpsTestBgImgFile);
    console.log("  test-question-red: correctChoice=", tqr_correctChoice, "leftCorrect=", tqr_leftCorrect, "leftFeedback=", tqr_leftFeedback, "rightFeedback=", tqr_rightFeedback);
    console.log("  test-question-blue: correctChoice=", tqb_correctChoice, "leftCorrect=", tqb_leftCorrect, "leftFeedback=", tqb_leftFeedback, "rightFeedback=", tqb_rightFeedback);
    console.log("Intro Fruits Video:", introFruitsVid);
    console.log("Fruits Test BG Img:", fruitsTestBgImgFile);
    console.log("  test-question-kiki: correctChoice=", tqk_correctChoice, "leftCorrect=", tqk_leftCorrect, "leftFeedback=", tqk_leftFeedback, "rightFeedback=", tqk_rightFeedback);
    console.log("  test-question-bubba: correctChoice=", tqbuba_correctChoice, "leftCorrect=", tqbuba_leftCorrect, "leftFeedback=", tqbuba_leftFeedback, "rightFeedback=", tqbuba_rightFeedback);
    console.log("Snack Time Video Part 1:", snackTimeVidP1);
    console.log("Snack Time Video Part 2:", snackTimeVidP2);
    console.log("Snack Time Test BG Img:", snackTimeTestBgImgFile);
    console.log("Fruit Choice Q Audio:", fruitChoiceQAudio);
    console.log("Team Choice Q Audio:", teamChoiceQAudio);
    console.log("Selected \"Why\" block will contain:", whyBlockConditional[0]);
    console.log("--- Sequence ---");
    console.log("Protocol Sequence (length " + protocolSequence.length + "):", JSON.stringify(protocolSequence));


    return {
        frames: frames,
        sequence: protocolSequence
    };
}