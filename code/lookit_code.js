function generateProtocol(child, pastSessions) {
    return {
        frames: {
            'video-config': {
                'kind': 'exp-video-config',
                'troubleshootingIntro': 'If you\'re having any trouble getting your webcam set up, please feel free to contact us for help!'
            },
            
            'video-consent': {
                'kind': 'exp-lookit-video-consent',
                'template': 'consent_005',
                'PIName': 'Researcher Name',
                'institution': 'Stanford University',
                'PIContact': 'researcher@stanford.edu',
                'purpose': 'Investigating how children understand social group dynamics.',
                'procedures': 'Your child will watch short videos about characters in different groups.',
                'risk_statement': 'There are no anticipated risks to participating in this study.',
                'voluntary_participation': 'Participation is entirely voluntary, and you may exit at any time.',
                'payment': 'You\'ll receive a $5 gift card as thanks for your participation.',
                'datause': 'We\'ll analyze your child\'s reactions and responses to understand social cognition.',
                'include_databrary': true,
                'gdpr': false,
                'research_rights_statement': 'For questions about your rights as a research participant, you may contact the Stanford IRB.'
            },
            
            'positioning': {
                'kind': 'exp-video-config-quality',
                'title': 'Positioning',
                'introText': 'Let\'s get you and your child positioned comfortably.',
                'showRecordMenu': false,
                'requireTestVideo': false,
                'completedItemText': 'Got it!',
                'instructionBlocks': [
                    {
                        'text': 'You and your child can sit in any comfortable position.',
                        'title': 'Get comfortable'
                    },
                    {
                        'text': 'Make sure your child\'s whole face is in view of the webcam.',
                        'title': 'Position yourselves'
                    },
                    {
                        'text': 'Press the \'Next\' button when you\'re ready to continue.',
                        'title': 'When you\'re ready'
                    }
                ],
                'nextButtonText': 'We\'re ready to start!',
                'showPreviousButton': true,
                'requireItemConfirmation': true,
                'recordingInstructionText': ''
            },
            
            'start-recording': {
                'kind': 'exp-lookit-start-recording',
                'imageAnimation': 'spin',
                'displayFullscreen': true
            },
            
            'stop-recording': {
                'kind': 'exp-lookit-stop-recording',
                'imageAnimation': 'spin',
                'displayFullscreen': true
            },
            
            'intro-gazoom': {
                    'kind': 'exp-lookit-video',
                    'video': {
                        'top': 0,
                        'left': 0,
                        'width': 100,
                        'source': 'intro_gazoom',
                        'loop': false
                    },
                    'backgroundColor': 'black',
                    'autoProceed': true,
                    'parentTextBlock': {
                        'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to watch the video carefully.',
                        'fontSize': 'x-large',
                        'css': {
                            'background-color': '#f8f3bf',
                            'width': '50vw',
                            'height': '16vh',
                            'margin': 'auto',
                            'bottom': '2vh',
                            'right': '0',
                            'left': '0',
                            'position': 'fixed',
                            'padding': '10px 25px',
                            'text-align': 'center',
                            'display': 'table-cell',
                            'vertical-align': 'middle',
                            'border-radius': '15px'
                        }
                    },
                    'showPreviousButton': false,
                    'showReplayButton': true,
                    'doRecording': false,
                    'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                    'videoTypes': ['mp4']
                },
                
                
            'intro-gazorps': {
                'kind': 'exp-lookit-video',
                'video': {
                    'top': 0,
                    'left': 0,
                    'width': 100,
                    'source': 'intro_gazorps_red',
                    'loop': false
                },
                'backgroundColor': 'black',
                'autoProceed': true,
                'parentTextBlock': {
                    'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to watch the video carefully.',
                    'fontSize': 'x-large',
                    'css': {
                        'background-color': '#f8f3bf',
                        'width': '50vw',
                        'height': '16vh',
                        'margin': 'auto',
                        'bottom': '2vh',
                        'right': '0',
                        'left': '0',
                        'position': 'fixed',
                        'padding': '10px 25px',
                        'text-align': 'center',
                        'display': 'table-cell',
                        'vertical-align': 'middle',
                        'border-radius': '15px'
                    }
                },
                'showPreviousButton': false,
                'showReplayButton': true,
                'doRecording': false,
                'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                'videoTypes': ['mp4']
            },
            
            
            'test-question-red': {
                'kind': 'exp-lookit-images-audio',
                'images': [
                    {
                        "id": 'background',
                        "src": 'gazorps_red.png',
                        "left": 0,
                        "width": 100,
                        "top": 0,
                        "height": 100,
                        'maximizeDisplay': true,
                        "nonChoiceOption": true,
                    },
                    {
                        "id": 'left-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 16,
                        "width": 30,
                        "top": 49,
                        "height": 50,
                        "correct": true,
                        "feedbackAudio": "good_job"
                    },
                    {
                        "id": 'right-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 57,
                        "width": 30,
                        "top": 49,
                        "height": 50,
                        "correct": false,
                        "feedbackAudio": "incorrect_red"
                    }
                ],
                'audio': 'question_click_red',
                'audioTypes': [
                    'mp3',
                    'ogg'
                ],
                'showReplayButton': true,
                'choiceRequired': true,
                'correctChoice': 'left-choice',
                'correctChoiceRequired': true,
                'backgroundColor': 'black',
                'pageColor': 'black',
                'doRecording': true,
                'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                'parentTextBlock': {
                    'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to answer on their own and avoid guiding or influencing their thoughts about the video.'
                }
            },
            
            'test-question-blue': {
                'kind': 'exp-lookit-images-audio',
                'images': [
                    {
                        "id": 'background',
                        "src": 'gazorps_red.png',
                        "left": 0,
                        "width": 100,
                        "top": 0,
                        "height": 100,
                        'maximizeDisplay': true,
                        "nonChoiceOption": true
                    },
                    {
                        "id": 'left-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 16,
                        "width": 30,
                        "top": 49,
                        "height": 50,
                        "correct": false,
                        "feedbackAudio": "incorrect_blue"
                    },
                    {
                        "id": 'right-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 57,
                        "width": 30,
                        "top": 49,
                        "height": 50,
                        "correct": true,
                        "feedbackAudio": "good_job"
                    }
                ],
                'audio': 'question_click_blue',
                'audioTypes': [
                    'mp3',
                    'ogg'
                ],
                'showReplayButton': true,
                'choiceRequired': true,
                'correctChoice': 'right-choice',
                'correctChoiceRequired': true,
                'backgroundColor': 'black',
                'pageColor': 'black',
                'doRecording': true,
                'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                'parentTextBlock': {
                    'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to answer on their own and avoid guiding or influencing their thoughts about the video.'
                }
            },
            
            'intro-fruits': {
                    'kind': 'exp-lookit-video',
                    'video': {
                        'top': 0,
                        'left': 0,
                        'width': 100,
                        'source': 'fruits_kiki',
                        'loop': false
                    },
                    'backgroundColor': 'black',
                    'autoProceed': true,
                    'parentTextBlock': {
                        'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to watch the video carefully.',
                        'fontSize': 'x-large',
                        'css': {
                            'background-color': '#f8f3bf',
                            'width': '50vw',
                            'height': '16vh',
                            'margin': 'auto',
                            'bottom': '2vh',
                            'right': '0',
                            'left': '0',
                            'position': 'fixed',
                            'padding': '10px 25px',
                            'text-align': 'center',
                            'display': 'table-cell',
                            'vertical-align': 'middle',
                            'border-radius': '15px'
                        }
                    },
                    'showPreviousButton': false,
                    'showReplayButton': true,
                    'doRecording': true,
                    'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                    'videoTypes': ['mp4']
                },
                
                'test-question-kiki': {
                'kind': 'exp-lookit-images-audio',
                'images': [
                    {
                        "id": 'background',
                        "src": 'fruits_kiki.png',
                        "left": 0,
                        "width": 100,
                        "top": 0,
                        "height": 100,
                        'maximizeDisplay': true,
                        "nonChoiceOption": true
                    },
                    {
                        "id": 'left-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 17.5,
                        "width": 30,
                        "top": 4,
                        "height": 92,
                        "correct": true,
                        "feedbackAudio": "good_job"
                    },
                    {
                        "id": 'right-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 54,
                        "width": 30,
                        "top": 4,
                        "height": 92,
                        "correct": false,
                        "feedbackAudio": "incorrect_kiki"
                    }
                ],
                'audio': 'question_click_kiki',
                'audioTypes': [
                    'mp3',
                    'ogg'
                ],
                'showReplayButton': true,
                'choiceRequired': true,
                'correctChoice': 'left-choice',
                'correctChoiceRequired': true,
                'backgroundColor': 'black',
                'pageColor': 'black',
                'doRecording': true,
                'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                'parentTextBlock': {
                    'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to answer on their own and avoid guiding or influencing their thoughts about the video.'
                }
            },
            
            'test-question-bubba': {
                'kind': 'exp-lookit-images-audio',
                'images': [
                    {
                        "id": 'background',
                        "src": 'fruits_kiki.png',
                        "left": 0,
                        "width": 100,
                        "top": 0,
                        "height": 100,
                        'maximizeDisplay': true,
                        "nonChoiceOption": true
                    },
                    {
                        "id": 'left-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 17.5,
                        "width": 30,
                        "top": 4,
                        "height": 92,
                        "correct": false,
                        "feedbackAudio": "incorrect_bubba"
                    },
                    {
                        "id": 'right-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 54,
                        "width": 30,
                        "top": 4,
                        "height": 92,
                        "correct": true,
                        "feedbackAudio": "good_job"
                    }
                ],
                'audio': 'question_click_bubba',
                'audioTypes': [
                    'mp3',
                    'ogg'
                ],
                'showReplayButton': true,
                'choiceRequired': true,
                'correctChoice': 'left-choice',
                'correctChoiceRequired': true,
                'backgroundColor': 'black',
                'pageColor': 'black',
                'doRecording': true,
                'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                'parentTextBlock': {
                    'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to answer on their own and avoid guiding or influencing their thoughts about the video.'
                }
            },
            
            'snack-time': {
                    'kind': 'exp-lookit-video',
                    'video': {
                        'top': 0,
                        'left': 0,
                        'width': 100,
                        'source': 'CD_group_CB01',
                        'loop': false
                    },
                    'backgroundColor': 'black',
                    'autoProceed': true,
                    'parentTextBlock': {
                        'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to watch the video carefully.',
                        'fontSize': 'x-large',
                        'css': {
                            'background-color': '#f8f3bf',
                            'width': '50vw',
                            'height': '16vh',
                            'margin': 'auto',
                            'bottom': '2vh',
                            'right': '0',
                            'left': '0',
                            'position': 'fixed',
                            'padding': '10px 25px',
                            'text-align': 'center',
                            'display': 'table-cell',
                            'vertical-align': 'middle',
                            'border-radius': '15px'
                        }
                    },
                    'showPreviousButton': false,
                    'showReplayButton': true,
                    'doRecording': true,
                    'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                    'videoTypes': ['mp4']
                },
                
                
                
            'test-question-fruit-choice': {
                'kind': 'exp-lookit-images-audio',
                'images': [
                    {
                        "id": 'background',
                        "src": 'CD_group_CB01_test.png',
                        "left": 0,
                        "width": 100,
                        "top": 0,
                        "height": 100,
                        'maximizeDisplay': true,
                        "nonChoiceOption": true
                    },
                    {
                        "id": 'left-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 19,
                        "width": 22,
                        "top": 65.5,
                        "height": 34,
                        "correct": true,
                        "feedbackAudio": "kiki"
                    },
                    {
                        "id": 'right-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 59,
                        "width": 22,
                        "top": 65.5,
                        "height": 34,
                        "correct": true,
                        "feedbackAudio": "bubba"
                    }
                ],
                'audio': 'question_like_what_kiki',
                'audioTypes': [
                    'mp3',
                    'ogg'
                ],
                'showReplayButton': true,
                'choiceRequired': true,
                'backgroundColor': 'black',
                'pageColor': 'black',
                'doRecording': true,
                'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                'parentTextBlock': {
                    'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to answer on their own and avoid guiding or influencing their thoughts about the video.'
                }
            },
            
            'test-question-team-choice': {
                'kind': 'exp-lookit-images-audio',
                'images': [
                    {
                        "id": 'background',
                        "src": 'CD_group_CB01_test.png',
                        "left": 0,
                        "width": 100,
                        "top": 0,
                        "height": 100,
                        'maximizeDisplay': true,
                        "nonChoiceOption": true
                    },
                    {
                        "id": 'left-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 12,
                        "width": 35,
                        "top": 0,
                        "height": 48,
                        "correct": true,
                        "feedbackAudio": "red_team"
                    },
                    {
                        "id": 'right-choice',
                        "src": 'answer_rect_blank.png',
                        "left": 53,
                        "width": 35,
                        "top": 0,
                        "height": 48,
                        "correct": true,
                        "feedbackAudio": "blue_team"
                    }
                ],
                'audio': 'question_team_red',
                'audioTypes': [
                    'mp3',
                    'ogg'
                ],
                'showReplayButton': true,
                'choiceRequired': true,
                'backgroundColor': 'black',
                'pageColor': 'black',
                'doRecording': true,
                'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                'parentTextBlock': {
                    'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to answer on their own and avoid guiding or influencing their thoughts about the video.'
                }
            },
            
            
            'test-question-team-choice-why': {
                'kind': 'exp-lookit-images-audio',
                'images': [
                    {
                        "id": 'background',
                        "src": 'CD_group_CB01_test.png',
                        "left": 0,
                        "width": 100,
                        "top": 0,
                        "height": 100,
                        'maximizeDisplay': true,
                        "nonChoiceOption": true
                    }
                ],
                'audioTypes': [
                    'mp3',
                    'ogg'
                ],
                'showReplayButton': true,
                'choiceRequired': false,
                'backgroundColor': 'black',
                'pageColor': 'black',
                'durationSeconds': 12,
                'doRecording': true,
                'baseDir': 'https://raw.githubusercontent.com/sociallearninglab/social_groups_lookit/main',
                'parentTextBlock': {
                    'text': '<b>FOR PARENTS</b>: \n\nPlease allow your child to say their answer out loud. Once your child has given their answer, you may click Next to continue.'
                },
                'generateProperties': 'function(expData, sequence, child, pastSessions) { var teamChoiceId = sequence[sequence.length - 1]; var whyAudio = "why_team_red"; console.log("Team choice ID:", teamChoiceId); if (expData[teamChoiceId] && expData[teamChoiceId].eventTimings) { console.log("Found event timings"); var events = expData[teamChoiceId].eventTimings; for (var i = 0; i < events.length; i++) { if (events[i].eventType === "exp-lookit-images-audio:startImageAudio") { console.log("Found image audio event"); console.log("Image ID:", events[i].imageId); if (events[i].imageId === "right-choice") { whyAudio = "why_team_blue"; console.log("Setting to blue team"); break; } } } } console.log("Final audio selection:", whyAudio); return { "audio": whyAudio }; }'
                },
            
            
            'exit-survey': {
                'kind': 'exp-lookit-exit-survey',
                'debriefing': {
                    'title': 'Thank you for participating!',
                    'blocks': [
                        {
                            'title': '',
                            'text': 'This research wouldn\'t be possible without families like yours.'
                        },
                        {
                            'title': 'Study Purpose:',
                            'text': 'INSERT'
                        },
                        {
                            'title': 'Compensation:',
                            'text': 'INSERT'
                        },
                        {
                            'title': 'Questions?',
                            'text': 'INSERT'
                        }
                    ]
                }
            }
        },
        
        
       sequence: [
            
            'snack-time',
            'video-config',
            'video-consent',
            'positioning',
            'start-recording',
            
            // First block: Gazoom/Gazorps intro and questions
            'intro-gazoom',
            'intro-gazorps',
            'test-question-red',
            'test-question-blue',
            
            // Second block: Fruits intro and questions
            'intro-fruits',
            'test-question-kiki',
            'test-question-bubba',
            
            // Third block: Snack time and final questions
            'test-question-fruit-choice',
            'test-question-team-choice',
            'test-question-team-choice-why',
            
            'stop-recording',
            'exit-survey'
        ]
    };
}