{
  "patcher": {
    "fileversion": 1,
    "appversion": {
      "major": 9,
      "minor": 1,
      "revision": 5,
      "architecture": "x64",
      "modernui": 1
    },
    "classnamespace": "box",
    "rect": [
      50,
      100,
      1110,
      700
    ],
    "openrect": [
      0,
      0,
      1110,
      169
    ],
    "openinpresentation": 1,
    "devicewidth": 1110,
    "default_fontname": "Arial",
    "default_fontsize": 11,
    "bgcolor": [
      0.13,
      0.16,
      0.18,
      1
    ],
    "boxes": [
      {
        "box": {
          "id": "title",
          "maxclass": "comment",
          "patching_rect": [
            12,
            5,
            450,
            23
          ],
          "presentation": 1,
          "presentation_rect": [
            12,
            5,
            450,
            23
          ],
          "text": "PROGRESSIVE / ARRANGEMENT GENERATOR",
          "fontsize": 15,
          "fontname": "Arial",
          "textcolor": [
            0.39,
            0.84,
            0.8,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "subtitle",
          "maxclass": "comment",
          "patching_rect": [
            475,
            9,
            230,
            16
          ],
          "presentation": 1,
          "presentation_rect": [
            475,
            9,
            230,
            16
          ],
          "text": "MIDI ONLY \u00b7 3 NEW TRACKS \u00b7 4/4",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "rootLabel",
          "maxclass": "comment",
          "patching_rect": [
            14,
            30,
            52,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            14,
            30,
            52,
            14
          ],
          "text": "Root",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "root",
          "maxclass": "live.menu",
          "patching_rect": [
            14,
            46,
            52,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            14,
            46,
            52,
            19
          ],
          "varname": "root",
          "parameter_enable": 1,
          "numinlets": 1,
          "numoutlets": 3,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Root",
              "parameter_shortname": "Root",
              "parameter_initial": [
                7
              ],
              "parameter_initial_enable": 1,
              "parameter_mmin": 0,
              "parameter_mmax": 11,
              "parameter_type": 2,
              "parameter_unitstyle": 0,
              "parameter_enum": [
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B"
              ]
            }
          }
        }
      },
      {
        "box": {
          "id": "modeLabel",
          "maxclass": "comment",
          "patching_rect": [
            78,
            30,
            105,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            78,
            30,
            105,
            14
          ],
          "text": "Scale",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "mode",
          "maxclass": "live.menu",
          "patching_rect": [
            78,
            46,
            105,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            78,
            46,
            105,
            19
          ],
          "varname": "mode",
          "parameter_enable": 1,
          "numinlets": 1,
          "numoutlets": 3,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Scale",
              "parameter_shortname": "Scale",
              "parameter_initial": [
                1
              ],
              "parameter_initial_enable": 1,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_type": 2,
              "parameter_unitstyle": 0,
              "parameter_enum": [
                "Major",
                "Natural Minor"
              ]
            }
          }
        }
      },
      {
        "box": {
          "id": "progressionLabel",
          "maxclass": "comment",
          "patching_rect": [
            195,
            30,
            130,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            195,
            30,
            130,
            14
          ],
          "text": "Progression",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "progression",
          "maxclass": "live.menu",
          "patching_rect": [
            195,
            46,
            130,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            195,
            46,
            130,
            19
          ],
          "varname": "progression",
          "parameter_enable": 1,
          "numinlets": 1,
          "numoutlets": 3,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Progression",
              "parameter_shortname": "Progression",
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1,
              "parameter_mmin": 0,
              "parameter_mmax": 2,
              "parameter_type": 2,
              "parameter_unitstyle": 0,
              "parameter_enum": [
                "1\u20136\u20133\u20137",
                "1\u20137\u20136\u20137",
                "1\u20134\u20136\u20135"
              ]
            }
          }
        }
      },
      {
        "box": {
          "id": "startBarLabel",
          "maxclass": "comment",
          "patching_rect": [
            337,
            30,
            72,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            337,
            30,
            72,
            14
          ],
          "text": "Start bar",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "startBar",
          "maxclass": "live.numbox",
          "patching_rect": [
            337,
            46,
            72,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            337,
            46,
            72,
            19
          ],
          "varname": "startBar",
          "parameter_enable": 1,
          "numinlets": 1,
          "numoutlets": 2,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Start bar",
              "parameter_shortname": "Start bar",
              "parameter_initial": [
                1
              ],
              "parameter_initial_enable": 1,
              "parameter_mmin": 1,
              "parameter_mmax": 394000,
              "parameter_type": 0,
              "parameter_unitstyle": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "seedLabel",
          "maxclass": "comment",
          "patching_rect": [
            421,
            30,
            105,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            421,
            30,
            105,
            14
          ],
          "text": "Seed",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "seed",
          "maxclass": "live.numbox",
          "patching_rect": [
            421,
            46,
            105,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            421,
            46,
            105,
            19
          ],
          "varname": "seed",
          "parameter_enable": 1,
          "numinlets": 1,
          "numoutlets": 2,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Seed",
              "parameter_shortname": "Seed",
              "parameter_initial": [
                1
              ],
              "parameter_initial_enable": 1,
              "parameter_mmin": 1,
              "parameter_mmax": 16777215,
              "parameter_type": 0,
              "parameter_unitstyle": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "densityLabel",
          "maxclass": "comment",
          "patching_rect": [
            538,
            30,
            75,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            538,
            30,
            75,
            14
          ],
          "text": "Density %",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "density",
          "maxclass": "live.numbox",
          "patching_rect": [
            538,
            46,
            75,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            538,
            46,
            75,
            19
          ],
          "varname": "density",
          "parameter_enable": 1,
          "numinlets": 1,
          "numoutlets": 2,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Density %",
              "parameter_shortname": "Density %",
              "parameter_initial": [
                60
              ],
              "parameter_initial_enable": 1,
              "parameter_mmin": 0,
              "parameter_mmax": 100,
              "parameter_type": 1,
              "parameter_unitstyle": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "variationLabel",
          "maxclass": "comment",
          "patching_rect": [
            625,
            30,
            75,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            625,
            30,
            75,
            14
          ],
          "text": "Variation %",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "variation",
          "maxclass": "live.numbox",
          "patching_rect": [
            625,
            46,
            75,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            625,
            46,
            75,
            19
          ],
          "varname": "variation",
          "parameter_enable": 1,
          "numinlets": 1,
          "numoutlets": 2,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Variation %",
              "parameter_shortname": "Variation %",
              "parameter_initial": [
                35
              ],
              "parameter_initial_enable": 1,
              "parameter_mmin": 0,
              "parameter_mmax": 100,
              "parameter_type": 1,
              "parameter_unitstyle": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "lengthLabel0",
          "maxclass": "comment",
          "patching_rect": [
            14,
            75,
            85,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            14,
            75,
            85,
            14
          ],
          "text": "Intro bars",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "length0",
          "maxclass": "live.menu",
          "patching_rect": [
            14,
            92,
            80,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            14,
            92,
            80,
            19
          ],
          "varname": "length0",
          "numinlets": 1,
          "numoutlets": 3,
          "parameter_enable": 1,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Intro bars",
              "parameter_shortname": "Intro",
              "parameter_type": 2,
              "parameter_enum": [
                "0",
                "4",
                "8",
                "12",
                "16",
                "20",
                "24",
                "28",
                "32",
                "36",
                "40",
                "44",
                "48",
                "52",
                "56",
                "60",
                "64"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 16,
              "parameter_initial": [
                4
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "lengthLabel1",
          "maxclass": "comment",
          "patching_rect": [
            106,
            75,
            85,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            106,
            75,
            85,
            14
          ],
          "text": "Build bars",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "length1",
          "maxclass": "live.menu",
          "patching_rect": [
            106,
            92,
            80,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            106,
            92,
            80,
            19
          ],
          "varname": "length1",
          "numinlets": 1,
          "numoutlets": 3,
          "parameter_enable": 1,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Build bars",
              "parameter_shortname": "Build",
              "parameter_type": 2,
              "parameter_enum": [
                "0",
                "4",
                "8",
                "12",
                "16",
                "20",
                "24",
                "28",
                "32",
                "36",
                "40",
                "44",
                "48",
                "52",
                "56",
                "60",
                "64"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 16,
              "parameter_initial": [
                4
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "lengthLabel2",
          "maxclass": "comment",
          "patching_rect": [
            198,
            75,
            85,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            198,
            75,
            85,
            14
          ],
          "text": "Main A bars",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "length2",
          "maxclass": "live.menu",
          "patching_rect": [
            198,
            92,
            80,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            198,
            92,
            80,
            19
          ],
          "varname": "length2",
          "numinlets": 1,
          "numoutlets": 3,
          "parameter_enable": 1,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Main A bars",
              "parameter_shortname": "Main A",
              "parameter_type": 2,
              "parameter_enum": [
                "0",
                "4",
                "8",
                "12",
                "16",
                "20",
                "24",
                "28",
                "32",
                "36",
                "40",
                "44",
                "48",
                "52",
                "56",
                "60",
                "64"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 16,
              "parameter_initial": [
                8
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "lengthLabel3",
          "maxclass": "comment",
          "patching_rect": [
            290,
            75,
            85,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            290,
            75,
            85,
            14
          ],
          "text": "Break bars",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "length3",
          "maxclass": "live.menu",
          "patching_rect": [
            290,
            92,
            80,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            290,
            92,
            80,
            19
          ],
          "varname": "length3",
          "numinlets": 1,
          "numoutlets": 3,
          "parameter_enable": 1,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Break bars",
              "parameter_shortname": "Break",
              "parameter_type": 2,
              "parameter_enum": [
                "0",
                "4",
                "8",
                "12",
                "16",
                "20",
                "24",
                "28",
                "32",
                "36",
                "40",
                "44",
                "48",
                "52",
                "56",
                "60",
                "64"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 16,
              "parameter_initial": [
                4
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "lengthLabel4",
          "maxclass": "comment",
          "patching_rect": [
            382,
            75,
            85,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            382,
            75,
            85,
            14
          ],
          "text": "Main B bars",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "length4",
          "maxclass": "live.menu",
          "patching_rect": [
            382,
            92,
            80,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            382,
            92,
            80,
            19
          ],
          "varname": "length4",
          "numinlets": 1,
          "numoutlets": 3,
          "parameter_enable": 1,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Main B bars",
              "parameter_shortname": "Main B",
              "parameter_type": 2,
              "parameter_enum": [
                "0",
                "4",
                "8",
                "12",
                "16",
                "20",
                "24",
                "28",
                "32",
                "36",
                "40",
                "44",
                "48",
                "52",
                "56",
                "60",
                "64"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 16,
              "parameter_initial": [
                8
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "lengthLabel5",
          "maxclass": "comment",
          "patching_rect": [
            474,
            75,
            85,
            14
          ],
          "presentation": 1,
          "presentation_rect": [
            474,
            75,
            85,
            14
          ],
          "text": "Outro bars",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "length5",
          "maxclass": "live.menu",
          "patching_rect": [
            474,
            92,
            80,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            474,
            92,
            80,
            19
          ],
          "varname": "length5",
          "numinlets": 1,
          "numoutlets": 3,
          "parameter_enable": 1,
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Outro bars",
              "parameter_shortname": "Outro",
              "parameter_type": 2,
              "parameter_enum": [
                "0",
                "4",
                "8",
                "12",
                "16",
                "20",
                "24",
                "28",
                "32",
                "36",
                "40",
                "44",
                "48",
                "52",
                "56",
                "60",
                "64"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 16,
              "parameter_initial": [
                4
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "sectionHint",
          "maxclass": "comment",
          "patching_rect": [
            571,
            78,
            135,
            34
          ],
          "presentation": 1,
          "presentation_rect": [
            571,
            78,
            135,
            34
          ],
          "text": "0 = skip\nEnd bar is exclusive",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "previewButton",
          "maxclass": "live.text",
          "patching_rect": [
            14,
            122,
            120,
            22
          ],
          "presentation": 1,
          "presentation_rect": [
            14,
            122,
            120,
            22
          ],
          "varname": "previewButton",
          "text": "PREVIEW",
          "texton": "PREVIEW",
          "mode": 0,
          "parameter_enable": 0,
          "numinlets": 1,
          "numoutlets": 2,
          "activebgcolor": [
            0.24,
            0.64,
            0.59,
            1
          ],
          "activetextcolor": [
            0.05,
            0.09,
            0.1,
            1
          ]
        }
      },
      {
        "box": {
          "id": "previewButtonSelect",
          "maxclass": "newobj",
          "patching_rect": [
            14,
            335,
            40,
            22
          ],
          "text": "t b",
          "numinlets": 1,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "previewButtonMessage",
          "maxclass": "message",
          "patching_rect": [
            14,
            365,
            90,
            22
          ],
          "text": "preview",
          "numinlets": 2,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "generateButton",
          "maxclass": "live.text",
          "patching_rect": [
            146,
            122,
            206,
            22
          ],
          "presentation": 1,
          "presentation_rect": [
            146,
            122,
            206,
            22
          ],
          "varname": "generateButton",
          "text": "GENERATE 3 TRACKS",
          "texton": "GENERATE 3 TRACKS",
          "mode": 0,
          "parameter_enable": 0,
          "numinlets": 1,
          "numoutlets": 2,
          "activebgcolor": [
            0.24,
            0.64,
            0.59,
            1
          ],
          "activetextcolor": [
            0.05,
            0.09,
            0.1,
            1
          ]
        }
      },
      {
        "box": {
          "id": "generateButtonSelect",
          "maxclass": "newobj",
          "patching_rect": [
            146,
            335,
            40,
            22
          ],
          "text": "t b",
          "numinlets": 1,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "generateButtonMessage",
          "maxclass": "message",
          "patching_rect": [
            146,
            365,
            90,
            22
          ],
          "text": "generate",
          "numinlets": 2,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "seedButton",
          "maxclass": "live.text",
          "patching_rect": [
            364,
            122,
            120,
            22
          ],
          "presentation": 1,
          "presentation_rect": [
            364,
            122,
            120,
            22
          ],
          "varname": "seedButton",
          "text": "NEW SEED",
          "texton": "NEW SEED",
          "mode": 0,
          "parameter_enable": 0,
          "numinlets": 1,
          "numoutlets": 2,
          "activebgcolor": [
            0.24,
            0.64,
            0.59,
            1
          ],
          "activetextcolor": [
            0.05,
            0.09,
            0.1,
            1
          ]
        }
      },
      {
        "box": {
          "id": "seedButtonSelect",
          "maxclass": "newobj",
          "patching_rect": [
            364,
            335,
            40,
            22
          ],
          "text": "t b",
          "numinlets": 1,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "seedButtonMessage",
          "maxclass": "message",
          "patching_rect": [
            364,
            365,
            90,
            22
          ],
          "text": "newseed",
          "numinlets": 2,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "previewHeader",
          "maxclass": "comment",
          "patching_rect": [
            724,
            12,
            365,
            19
          ],
          "presentation": 1,
          "presentation_rect": [
            724,
            12,
            365,
            19
          ],
          "text": "SECTIONS \u00b7 start\u2013end bar | Bass / Chords / Arp notes",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.39,
            0.84,
            0.8,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "section0",
          "maxclass": "comment",
          "patching_rect": [
            724,
            36,
            370,
            17
          ],
          "presentation": 1,
          "presentation_rect": [
            724,
            36,
            370,
            17
          ],
          "text": "Intro  \u2014  Preview to calculate",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0,
          "varname": "section0"
        }
      },
      {
        "box": {
          "id": "section1",
          "maxclass": "comment",
          "patching_rect": [
            724,
            53,
            370,
            17
          ],
          "presentation": 1,
          "presentation_rect": [
            724,
            53,
            370,
            17
          ],
          "text": "Build  \u2014  Preview to calculate",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0,
          "varname": "section1"
        }
      },
      {
        "box": {
          "id": "section2",
          "maxclass": "comment",
          "patching_rect": [
            724,
            70,
            370,
            17
          ],
          "presentation": 1,
          "presentation_rect": [
            724,
            70,
            370,
            17
          ],
          "text": "Main A  \u2014  Preview to calculate",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0,
          "varname": "section2"
        }
      },
      {
        "box": {
          "id": "section3",
          "maxclass": "comment",
          "patching_rect": [
            724,
            87,
            370,
            17
          ],
          "presentation": 1,
          "presentation_rect": [
            724,
            87,
            370,
            17
          ],
          "text": "Break  \u2014  Preview to calculate",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0,
          "varname": "section3"
        }
      },
      {
        "box": {
          "id": "section4",
          "maxclass": "comment",
          "patching_rect": [
            724,
            104,
            370,
            17
          ],
          "presentation": 1,
          "presentation_rect": [
            724,
            104,
            370,
            17
          ],
          "text": "Main B  \u2014  Preview to calculate",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0,
          "varname": "section4"
        }
      },
      {
        "box": {
          "id": "section5",
          "maxclass": "comment",
          "patching_rect": [
            724,
            121,
            370,
            17
          ],
          "presentation": 1,
          "presentation_rect": [
            724,
            121,
            370,
            17
          ],
          "text": "Outro  \u2014  Preview to calculate",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0,
          "varname": "section5"
        }
      },
      {
        "box": {
          "id": "status",
          "maxclass": "comment",
          "patching_rect": [
            14,
            150,
            1075,
            17
          ],
          "presentation": 1,
          "presentation_rect": [
            14,
            150,
            1075,
            17
          ],
          "text": "Initializing\u2026",
          "fontsize": 10,
          "fontname": "Arial",
          "textcolor": [
            0.82,
            0.86,
            0.88,
            1
          ],
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "uiDefer",
          "maxclass": "newobj",
          "patching_rect": [
            14,
            400,
            65,
            22
          ],
          "text": "deferlow",
          "numinlets": 1,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "composer",
          "maxclass": "v8.codebox",
          "patching_rect": [
            14,
            440,
            520,
            200
          ],
          "code": "/* Pure composition engine. Also embedded verbatim in the device's v8.codebox. */\nvar PAG = (function () {\n    \"use strict\";\n    const sectionNames = [\"Intro\", \"Build\", \"Main A\", \"Break\", \"Main B\", \"Outro\"];\n    const parts = [\"Bass\", \"Chords\", \"Arp\"];\n    const progressions = [[0, 5, 2, 6], [0, 6, 5, 6], [0, 3, 5, 4]];\n    const defaults = {root: 7, mode: 1, progression: 0, startBar: 1,\n        density: 60, variation: 35, seed: 1, lengths: [16, 16, 32, 16, 32, 16]};\n    function integer(v, lo, hi, label) {\n        if (!Number.isInteger(v) || v < lo || v > hi) throw new Error(label + \" must be \" + lo + \"\u2013\" + hi + \".\");\n    }\n    function validate(s) {\n        integer(s.root, 0, 11, \"Root\"); integer(s.mode, 0, 1, \"Scale\");\n        integer(s.progression, 0, 2, \"Progression\"); integer(s.startBar, 1, 394000, \"Start bar\");\n        integer(s.density, 0, 100, \"Density\"); integer(s.variation, 0, 100, \"Variation\");\n        integer(s.seed, 1, 2147483646, \"Seed\");\n        if (!Array.isArray(s.lengths) || s.lengths.length !== 6) throw new Error(\"Six section lengths are required.\");\n        s.lengths.forEach((n, i) => { integer(n, 0, 64, sectionNames[i]);\n            if (n % 4) throw new Error(sectionNames[i] + \" must be a multiple of four bars.\"); });\n        const total = s.lengths.reduce((a, b) => a + b, 0);\n        if (!total) throw new Error(\"Enable at least one section.\");\n        if ((s.startBar - 1 + total) * 4 > 1576800) throw new Error(\"Arrangement extends beyond Live's supported time range.\");\n    }\n    function random(seed) {\n        let n = seed >>> 0;\n        return () => { n = (Math.imul(1664525, n) + 1013904223) >>> 0; return n / 4294967296; };\n    }\n    function pc(n) { return ((n % 12) + 12) % 12; }\n    function fit(n, lo, hi) { while (n < lo) n += 12; while (n > hi) n -= 12; return n; }\n    function voicing(pcs, previous) {\n        const candidates = pcs.map(p => Array.from({length: 25}, (_, i) => 55 + i).filter(n => pc(n) === p));\n        let best, cost = Infinity;\n        candidates[0].forEach(a => candidates[1].forEach(b => candidates[2].forEach(c => {\n            const v = [a, b, c].sort((x, y) => x - y);\n            if (v[2] - v[0] > 16) return;\n            const target = previous || [60, 64, 67];\n            const score = v.reduce((sum, n, i) => sum + Math.abs(n - target[i]), 0);\n            if (score < cost) { cost = score; best = v; }\n        })));\n        return best;\n    }\n    function energy(section, fraction, part) {\n        if (section === 0) return part === 0 ? 0 : (part === 1 ? 0.45 : 0.25);\n        if (section === 1) return 0.35 + fraction * 0.6;\n        if (section === 2) return 0.95;\n        if (section === 3) return part === 0 ? 0 : (part === 1 ? 0.65 : 0.18);\n        if (section === 4) return 1;\n        return Math.max(0, 1 - fraction);\n    }\n    function compose(input) {\n        const s = JSON.parse(JSON.stringify(input)); validate(s);\n        const scale = s.mode ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11];\n        const degreePitch = d => s.root + scale[((d % 7) + 7) % 7] + 12 * Math.floor(d / 7);\n        const rand = random(s.seed), motifRand = random(s.seed ^ 0x5f3759df);\n        const gates = [Array.from({length: 32}, () => motifRand()), Array.from({length: 4}, () => motifRand()),\n            Array.from({length: 64}, () => motifRand())];\n        let elapsed = 0, previous = null, rotation = 0, descending = false;\n        const clips = [], sections = [];\n        for (let si = 0; si < 6; si++) {\n            const bars = s.lengths[si]; if (!bars) continue;\n            const notes = [[], [], []], start = (s.startBar - 1 + elapsed) * 4;\n            const summary = {name: sectionNames[si], startBar: s.startBar + elapsed,\n                endBar: s.startBar + elapsed + bars, bars: bars, counts: [0, 0, 0]};\n            for (let b = 0; b < bars; b++) {\n                const songBar = elapsed + b, deg = progressions[s.progression][songBar % 4];\n                const pcs = [deg, deg + 2, deg + 4].map(d => pc(degreePitch(d)));\n                const chord = voicing(pcs, previous); previous = chord;\n                const arp = chord.map(n => fit(n, 67, 91)).sort((a, z) => a - z);\n                if (songBar % 4 === 0 && rand() < s.variation / 100) {\n                    rotation = Math.floor(rand() * 6); descending = rand() < 0.5;\n                }\n                const fraction = (b + 0.5) / bars;\n                function add(part, pitch, time, duration, velocity) {\n                    notes[part].push({pitch: pitch, start_time: time,\n                        duration: Math.min(duration, bars * 4 - time),\n                        velocity: Math.max(1, Math.min(127, velocity + Math.floor(rand() * 11) - 5)),\n                        mute: 0, probability: 1});\n                }\n                function keep(part, step) {\n                    const e = energy(si, fraction, part);\n                    const gate = gates[part][step % gates[part].length];\n                    return e > 0 && gate < (s.density / 100) * e;\n                }\n                for (let step = 0; step < 8; step++) {\n                    if (!keep(0, (songBar % 4) * 8 + step)) continue;\n                    let pitch = fit(36 + degreePitch(deg), 31, 55);\n                    if (step % 4 === 3) pitch = fit(36 + degreePitch(deg + 4), 31, 55);\n                    if (step === 7 && rand() < s.variation / 100) {\n                        const next = progressions[s.progression][(songBar + 1) % 4];\n                        pitch = fit(36 + degreePitch(next - 1), 31, 55);\n                    }\n                    add(0, pitch, b * 4 + step * 0.5, 0.42, step % 2 ? 86 : 97);\n                }\n                if (keep(1, songBar % 4)) chord.forEach(n => add(1, n, b * 4, 3.8, 74));\n                for (let step = 0; step < 16; step++) {\n                    if (!keep(2, (songBar % 4) * 16 + step)) continue;\n                    const pattern = [0, 1, 2, 1, 0, 2];\n                    const index = pattern[(step + rotation) % pattern.length];\n                    const pitch = arp[descending ? 2 - index : index];\n                    add(2, pitch, b * 4 + step * 0.25, 0.20, step % 4 === 0 ? 88 : 76);\n                }\n            }\n            notes.forEach((ns, pi) => {\n                summary.counts[pi] = ns.length;\n                if (ns.length) clips.push({part: pi, section: si, name: sectionNames[si] + \" | \" + parts[pi],\n                    start: start, length: bars * 4, notes: ns});\n            });\n            sections.push(summary); elapsed += bars;\n        }\n        return {version: 1, settings: s, totalBars: elapsed, sections: sections, clips: clips,\n            noteCount: clips.reduce((n, c) => n + c.notes.length, 0)};\n    }\n    return {defaults: defaults, compose: compose, validate: validate, parts: parts, sectionNames: sectionNames};\n}());\nif (typeof module !== \"undefined\") module.exports = PAG;\n\n/* Appended to composer.js inside the composition codebox. No external dependencies. */\ninlets = 1;\noutlets = 2;\nvar uiReady = false;\nvar writerBusy = false;\nfunction uiStatus(text) { outlet(1, \"set\", text); }\nfunction init() { uiReady = true; uiStatus(\"Ready \u00b7 MIDI clips only \u00b7 Stop Live before Generate.\"); }\nfunction busy(value) { writerBusy = Number(value) !== 0; }\nfunction readControl(name) {\n    const v = this.patcher.getnamed(name).getvalueof();\n    return Math.round(Number(Array.isArray(v) ? v[0] : v));\n}\nfunction readSettings() {\n    return {root: readControl(\"root\"), mode: readControl(\"mode\"), progression: readControl(\"progression\"),\n        startBar: readControl(\"startBar\"), density: readControl(\"density\"), variation: readControl(\"variation\"),\n        seed: readControl(\"seed\"), lengths: [0, 1, 2, 3, 4, 5].map(i => readControl(\"length\" + i) * 4)};\n}\nfunction showPreview(plan) {\n    for (let i = 0; i < 6; i++) {\n        const name = PAG.sectionNames[i], s = plan.sections.find(x => x.name === name);\n        const text = s ? name + \"  \" + s.startBar + \"\u2013\" + s.endBar + \"  |  \" + s.counts.join(\" / \") : name + \"  skipped\";\n        this.patcher.getnamed(\"section\" + i).message(\"set\", text);\n    }\n}\nfunction makePlan() {\n    if (!uiReady) throw new Error(\"Device is initializing. Try again in a moment.\");\n    if (writerBusy) throw new Error(\"Generation is in progress. Wait for completion.\");\n    const p = PAG.compose(readSettings()); showPreview(p); return p;\n}\nfunction preview() {\n    try { const p = makePlan(); uiStatus(\"Preview \u00b7 \" + p.totalBars + \" bars \u00b7 \" + p.clips.length + \" clips \u00b7 \" + p.noteCount + \" notes \u00b7 B / C / A counts at right.\"); }\n    catch (e) { uiStatus(\"Error \u00b7 \" + e.message); }\n}\nfunction generate() {\n    try {\n        const p = makePlan();\n        if (!p.noteCount) throw new Error(\"No notes at these settings. Raise Density before Generate.\");\n        outlet_dictionary(0, p);\n    } catch (e) { uiStatus(\"Error \u00b7 \" + e.message); }\n}\nfunction newseed() {\n    if (writerBusy) return;\n    const current = readControl(\"seed\");\n    let value = Math.floor(Math.random() * 16777215) + 1;\n    if (value === current) value = current === 16777215 ? 1 : current + 1;\n    this.patcher.getnamed(\"seed\").message(value);\n    uiStatus(\"Seed \" + value + \" \u00b7 Preview to inspect; Generate to write new tracks.\");\n}\n",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "saved_object_attributes": {
            "parameter_enable": 0
          }
        }
      },
      {
        "box": {
          "id": "writer",
          "maxclass": "v8.codebox",
          "patching_rect": [
            570,
            440,
            520,
            200
          ],
          "code": "/* Bounded state machine. Host adapter is separate so this can be tested without Live. */\nfunction createArrangementWriter(host) {\n    let state = null;\n    const partNames = [\"Bass\", \"Chords\", \"Arp\"];\n    const colors = [0x6f9fc9, 0x70bba3, 0xc394ce, 0x7f8db5, 0xe4ad70, 0x859aab];\n    function guard() {\n        const s = host.context();\n        if (!s.id) throw new Error(\"Live Set is unavailable.\");\n        if (s.playing || s.recording) throw new Error(\"Stop playback and recording before generating.\");\n        if (s.numerator !== 4 || s.denominator !== 4) throw new Error(\"Version 1 supports 4/4 only. Choose a 4/4 Set.\");\n        if (state && s.id !== state.songId) throw new Error(\"Live Set changed during generation.\");\n        return s;\n    }\n    function fail(e) {\n        const created = state ? state.tracks.map(t => t.name).join(\", \") : \"\";\n        const pending = state && state.phase === \"track-check\" ? \" A track creation was requested; inspect the end of the Set.\" : \"\";\n        host.cancel(); host.busy(false);\n        host.status(\"Error \u00b7 \" + e.message + (created ? \" Partial output retained: \" + created + \".\" : \" No verified output tracks.\") + pending);\n        state = null;\n    }\n    function start(plan) {\n        if (state) { host.status(\"Generation already in progress.\"); return false; }\n        try {\n            guard();\n            if (!plan || plan.version !== 1 || !plan.noteCount || !plan.clips.length) throw new Error(\"Preview contains no MIDI notes.\");\n            const tracks = host.tracks();\n            host.checkCapability();\n            let run = 1;\n            tracks.forEach(t => { const m = /^PAG (\\d+) (Bass|Chords|Arp)$/.exec(t.name); if (m) run = Math.max(run, Number(m[1]) + 1); });\n            state = {songId: host.context().id, plan: plan, run: run, originals: tracks.map(t => t.id),\n                tracks: [], phase: \"track-create\", clipIndex: 0, current: null, offset: 0};\n            host.busy(true); host.status(\"Creating PAG \" + run + \" \u00b7 3 fresh MIDI tracks\u2026\"); host.schedule();\n            return true;\n        } catch (e) { fail(e); return false; }\n    }\n    function tick() {\n        if (!state) return;\n        try {\n            guard();\n            const s = state;\n            if (s.phase === \"track-create\") {\n                s.before = host.tracks().map(t => t.id);\n                host.createTrack(); s.phase = \"track-check\";\n            } else if (s.phase === \"track-check\") {\n                const all = host.tracks(), fresh = all.filter(t => s.before.indexOf(t.id) < 0);\n                if (fresh.length !== 1 || all.length !== s.before.length + 1) throw new Error(\"Could not identify the new track. Stop editing the Set during generation.\");\n                const t = fresh[0], part = s.tracks.length;\n                t.name = \"PAG \" + s.run + \" \" + partNames[part];\n                s.tracks.push(t);\n                host.nameTrack(t.id, t.name, [0x5fa8d3, 0x78b89b, 0xc192cf][part]);\n                s.phase = s.tracks.length < 3 ? \"track-create\" : \"clip-create\";\n            } else if (s.phase === \"clip-create\") {\n                if (s.clipIndex === s.plan.clips.length) { s.phase = \"finish\"; }\n                else {\n                    s.current = s.plan.clips[s.clipIndex];\n                    const t = s.tracks[s.current.part];\n                    s.beforeClips = host.clips(t.id).map(c => c.id);\n                    host.createClip(t.id, s.current.start, s.current.length);\n                    s.phase = \"clip-check\";\n                }\n            } else if (s.phase === \"clip-check\") {\n                const t = s.tracks[s.current.part];\n                const fresh = host.clips(t.id).filter(c => s.beforeClips.indexOf(c.id) < 0);\n                if (fresh.length !== 1) throw new Error(\"Arrangement clip creation failed on \" + t.name + \".\");\n                s.clipId = fresh[0].id;\n                if (Math.abs(fresh[0].start - s.current.start) > 0.001 || Math.abs(fresh[0].length - s.current.length) > 0.001)\n                    throw new Error(\"New clip has an unexpected position or length.\");\n                host.configureClip(s.clipId, \"PAG \" + s.run + \" | \" + s.current.name, colors[s.current.section], s.current.length);\n                s.offset = 0; s.phase = \"notes\";\n            } else if (s.phase === \"notes\") {\n                const chunk = s.current.notes.slice(s.offset, s.offset + 128);\n                host.addNotes(s.clipId, chunk); s.offset += chunk.length;\n                host.status(\"PAG \" + s.run + \" \u00b7 \" + s.current.name + \" \u00b7 clip \" + (s.clipIndex + 1) + \"/\" + s.plan.clips.length + \" \u00b7 \" + s.offset + \"/\" + s.current.notes.length + \" notes\");\n                if (s.offset === s.current.notes.length) s.phase = \"verify\";\n            } else if (s.phase === \"verify\") {\n                host.verifyClip(s.clipId, s.current);\n                s.clipIndex++; s.phase = \"clip-create\";\n            } else if (s.phase === \"finish\") {\n                const ids = host.tracks().map(t => t.id);\n                if (s.originals.some(id => ids.indexOf(id) < 0)) throw new Error(\"An original track disappeared during generation.\");\n                if (s.tracks.some(t => ids.indexOf(t.id) < 0)) throw new Error(\"A generated track disappeared during generation.\");\n                host.busy(false);\n                host.status(\"Done \u00b7 PAG \" + s.run + \" \u00b7 \" + s.plan.totalBars + \" bars \u00b7 \" + s.plan.clips.length + \" clips \u00b7 \" + s.plan.noteCount + \" verified notes. Add your instruments.\");\n                host.complete(s); state = null; return;\n            }\n            host.schedule();\n        } catch (e) { fail(e); }\n    }\n    function dispose() { host.cancel(); state = null; }\n    return {start: start, tick: tick, dispose: dispose, isBusy: () => state !== null};\n}\nif (typeof module !== \"undefined\") module.exports = createArrangementWriter;\n\n/* Appended to arrangement-writer.js in its own embedded v8.codebox. */\ninlets = 1;\noutlets = 2;\nvar liveWriter = null, tickTask = null, liveSong = null;\nfunction scalar(v) { return Number(Array.isArray(v) ? v[0] : v); }\nfunction objectIds(v) {\n    if (!Array.isArray(v)) return [];\n    const ids = [];\n    for (let i = 0; i < v.length; i++) if (v[i] === \"id\" && Number(v[i + 1]) > 0) ids.push(Number(v[++i]));\n    return ids;\n}\nfunction api(id) { const a = new LiveAPI(null, \"id \" + id); if (!Number(a.id)) throw new Error(\"Live object \" + id + \" is no longer available.\"); return a; }\nfunction decodeNotes(reply) {\n    if (reply && typeof reply === \"object\" && !Array.isArray(reply) && reply.notes) return reply.notes;\n    if (Array.isArray(reply) && reply[0] === \"dictionary\") return JSON.parse(new Dict(reply[1]).stringify()).notes;\n    const raw = Array.isArray(reply) ? reply.join(\" \") : String(reply);\n    const decoded = JSON.parse(raw);\n    if (!Array.isArray(decoded.notes)) throw new Error(\"Live did not return a readable notes dictionary.\");\n    return decoded.notes;\n}\nfunction init() {\n    if (liveWriter) liveWriter.dispose();\n    liveSong = new LiveAPI(null, \"live_set\");\n    tickTask = new Task(function () { if (liveWriter) liveWriter.tick(); }, this);\n    const host = {\n        context: function () { return {id: Number(liveSong.id), playing: scalar(liveSong.get(\"is_playing\")),\n            recording: scalar(liveSong.get(\"record_mode\")) || scalar(liveSong.get(\"session_record\")),\n            numerator: scalar(liveSong.get(\"signature_numerator\")), denominator: scalar(liveSong.get(\"signature_denominator\"))}; },\n        tracks: function () { return objectIds(liveSong.get(\"tracks\")).map(id => ({id: id, name: api(id).getstring(\"name\")})); },\n        checkCapability: function () {\n            const a = new LiveAPI(null, \"this_device canonical_parent\");\n            if (String(a.info).indexOf(\"create_midi_clip\") < 0) throw new Error(\"This Live version does not expose Arrangement MIDI clip creation. Update Live 12.\");\n        },\n        createTrack: function () { liveSong.call(\"create_midi_track\", -1); },\n        nameTrack: function (id, name, color) { const a = api(id); a.set(\"name\", name); a.set(\"color\", color);\n            if (a.getstring(\"name\") !== name) throw new Error(\"Could not name the new track.\"); },\n        clips: function (id) { return objectIds(api(id).get(\"arrangement_clips\")).map(cid => {\n            const a = api(cid); return {id: cid, start: scalar(a.get(\"start_time\")), length: scalar(a.get(\"end_time\")) - scalar(a.get(\"start_time\"))};\n        }); },\n        createClip: function (id, start, length) { api(id).call(\"create_midi_clip\", start, length); },\n        configureClip: function (id, name, color, length) { const a = api(id); a.set(\"name\", name); a.set(\"color\", color);\n            a.set(\"looping\", 0); a.set(\"start_marker\", 0); a.set(\"end_marker\", length); },\n        addNotes: function (id, notes) { api(id).call(\"add_new_notes\", JSON.stringify({notes: notes})); },\n        verifyClip: function (id, expected) {\n            const a = api(id), notes = decodeNotes(a.call(\"get_all_notes_extended\"));\n            if (notes.length !== expected.notes.length) throw new Error(\"Note write failed in \" + expected.name + \": expected \" + expected.notes.length + \", got \" + notes.length + \".\");\n            const sort = ns => ns.slice().sort((x, y) => x.start_time - y.start_time || x.pitch - y.pitch);\n            const actual = sort(notes), want = sort(expected.notes);\n            for (let i = 0; i < want.length; i++) {\n                if (actual[i].pitch !== want[i].pitch || Math.abs(actual[i].start_time - want[i].start_time) > 0.001 ||\n                    Math.abs(actual[i].duration - want[i].duration) > 0.002 || Math.abs(actual[i].velocity - want[i].velocity) > 1)\n                    throw new Error(\"Note verification mismatch in \" + expected.name + \".\");\n            }\n            if (Math.abs(scalar(a.get(\"start_time\")) - expected.start) > 0.001 ||\n                Math.abs(scalar(a.get(\"end_time\")) - expected.start - expected.length) > 0.001)\n                throw new Error(\"Clip boundaries changed in \" + expected.name + \".\");\n        },\n        busy: function (value) {\n            outlet(1, \"busy\", value ? 1 : 0);\n            [\"generateButton\", \"previewButton\", \"seedButton\"].forEach(name => thisPatcher.getnamed(name).message(\"active\", value ? 0 : 1));\n        },\n        status: function (text) { outlet(0, \"set\", text); post(\"PAG: \" + text + \"\\n\"); },\n        schedule: function () { tickTask.schedule(10); },\n        cancel: function () { if (tickTask) tickTask.cancel(); },\n        complete: function () {}\n    };\n    const thisPatcher = this.patcher;\n    liveWriter = createArrangementWriter(host);\n}\nfunction msg_dictionary(plan) {\n    if (!liveWriter) { outlet(0, \"set\", \"Error \u00b7 Device is still initializing.\"); return; }\n    liveWriter.start(plan);\n}\nfunction dictionary(name) { msg_dictionary(JSON.parse(new Dict(name).stringify())); }\nfunction notifydeleted() { if (liveWriter) liveWriter.dispose(); }\n",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "saved_object_attributes": {
            "parameter_enable": 0
          }
        }
      },
      {
        "box": {
          "id": "thisDevice",
          "maxclass": "newobj",
          "patching_rect": [
            14,
            220,
            90,
            22
          ],
          "text": "live.thisdevice",
          "numinlets": 1,
          "numoutlets": 3
        }
      },
      {
        "box": {
          "id": "initDefer",
          "maxclass": "newobj",
          "patching_rect": [
            14,
            250,
            65,
            22
          ],
          "text": "deferlow",
          "numinlets": 1,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "initTrigger",
          "maxclass": "newobj",
          "patching_rect": [
            14,
            280,
            45,
            22
          ],
          "text": "t b b",
          "numinlets": 1,
          "numoutlets": 2
        }
      },
      {
        "box": {
          "id": "initWriter",
          "maxclass": "message",
          "patching_rect": [
            95,
            280,
            35,
            22
          ],
          "text": "init",
          "numinlets": 2,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "initComposer",
          "maxclass": "message",
          "patching_rect": [
            145,
            280,
            35,
            22
          ],
          "text": "init",
          "numinlets": 2,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "midiIn",
          "maxclass": "newobj",
          "patching_rect": [
            280,
            230,
            50,
            22
          ],
          "text": "midiin",
          "numinlets": 1,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "midiOut",
          "maxclass": "newobj",
          "patching_rect": [
            280,
            270,
            50,
            22
          ],
          "text": "midiout",
          "numinlets": 1,
          "numoutlets": 0
        }
      },
      {
        "box": {
          "id": "sourceNote",
          "maxclass": "comment",
          "patching_rect": [
            400,
            220,
            650,
            60
          ],
          "text": "Two embedded JavaScript modules: composition + deferred Live API writer. MIDI passes through unchanged; no audio objects or live note generator. Edit source files and run build_device.py to rebuild.",
          "linecount": 3
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [
            "previewButton",
            0
          ],
          "destination": [
            "previewButtonSelect",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "previewButtonSelect",
            0
          ],
          "destination": [
            "previewButtonMessage",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "previewButtonMessage",
            0
          ],
          "destination": [
            "uiDefer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "generateButton",
            0
          ],
          "destination": [
            "generateButtonSelect",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "generateButtonSelect",
            0
          ],
          "destination": [
            "generateButtonMessage",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "generateButtonMessage",
            0
          ],
          "destination": [
            "uiDefer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "seedButton",
            0
          ],
          "destination": [
            "seedButtonSelect",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "seedButtonSelect",
            0
          ],
          "destination": [
            "seedButtonMessage",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "seedButtonMessage",
            0
          ],
          "destination": [
            "uiDefer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "uiDefer",
            0
          ],
          "destination": [
            "composer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "composer",
            0
          ],
          "destination": [
            "writer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "composer",
            1
          ],
          "destination": [
            "status",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "writer",
            0
          ],
          "destination": [
            "status",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "writer",
            1
          ],
          "destination": [
            "composer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "thisDevice",
            0
          ],
          "destination": [
            "initDefer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "initDefer",
            0
          ],
          "destination": [
            "initTrigger",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "initTrigger",
            1
          ],
          "destination": [
            "initWriter",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "initWriter",
            0
          ],
          "destination": [
            "writer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "initTrigger",
            0
          ],
          "destination": [
            "initComposer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "initComposer",
            0
          ],
          "destination": [
            "composer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midiIn",
            0
          ],
          "destination": [
            "midiOut",
            0
          ]
        }
      }
    ],
    "parameters": {
      "root": [
        "Root",
        "Root",
        0
      ],
      "mode": [
        "Scale",
        "Scale",
        0
      ],
      "progression": [
        "Progression",
        "Progression",
        0
      ],
      "startBar": [
        "Start bar",
        "Start bar",
        0
      ],
      "seed": [
        "Seed",
        "Seed",
        0
      ],
      "density": [
        "Density %",
        "Density %",
        0
      ],
      "variation": [
        "Variation %",
        "Variation %",
        0
      ],
      "length0": [
        "Intro bars",
        "Intro",
        0
      ],
      "length1": [
        "Build bars",
        "Build",
        0
      ],
      "length2": [
        "Main A bars",
        "Main A",
        0
      ],
      "length3": [
        "Break bars",
        "Break",
        0
      ],
      "length4": [
        "Main B bars",
        "Main B",
        0
      ],
      "length5": [
        "Outro bars",
        "Outro",
        0
      ]
    },
    "dependency_cache": [],
    "autosave": 0,
    "project": {
      "version": 1,
      "amxdtype": 1835887981,
      "readonly": 0,
      "devpathtype": 0,
      "devpath": ".",
      "autoorganize": 1,
      "hideprojectwindow": 1,
      "autolocalize": 0,
      "contents": {
        "patchers": {}
      },
      "searchpath": {},
      "layout": {}
    }
  }
}
