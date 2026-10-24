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
      50.0,
      100.0,
      1160.0,
      169.0
    ],
    "openrect": [
      0.0,
      0.0,
      1160.0,
      169.0
    ],
    "openrectmode": 0,
    "openinpresentation": 1,
    "default_fontsize": 11.0,
    "devicewidth": 1160.0,
    "boxes": [
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 16.0,
          "id": "title",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            14.0,
            6.0,
            500.0,
            24.0
          ],
          "presentation": 1,
          "presentation_rect": [
            14.0,
            6.0,
            500.0,
            24.0
          ],
          "text": "PAG / SINE TEST INSTRUMENT",
          "textcolor": [
            0.4,
            0.84,
            0.8,
            1.0
          ],
          "varname": "title"
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 10.0,
          "id": "subtitle",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            14.0,
            116.0,
            480.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            14.0,
            116.0,
            480.0,
            18.0
          ],
          "text": "8 VOICES \u00b7 MIDI IN \u2192 SINE AUDIO OUT",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "subtitle"
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 10.0,
          "id": "levelLabel",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            14.0,
            37.0,
            110.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            14.0,
            37.0,
            110.0,
            18.0
          ],
          "text": "Level %",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "levelLabel"
        }
      },
      {
        "box": {
          "id": "level",
          "maxclass": "live.numbox",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "float"
          ],
          "parameter_enable": 1,
          "patching_rect": [
            14.0,
            57.0,
            110.0,
            15.0
          ],
          "presentation": 1,
          "presentation_rect": [
            14.0,
            57.0,
            110.0,
            15.0
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_initial": [
                70
              ],
              "parameter_initial_enable": 1,
              "parameter_longname": "Level %",
              "parameter_mmax": 100.0,
              "parameter_modmode": 0,
              "parameter_shortname": "Level %",
              "parameter_type": 0,
              "parameter_unitstyle": 0
            }
          },
          "varname": "level"
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 10.0,
          "id": "attackLabel",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            142.0,
            37.0,
            110.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            142.0,
            37.0,
            110.0,
            18.0
          ],
          "text": "Attack ms",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "attackLabel"
        }
      },
      {
        "box": {
          "id": "attack",
          "maxclass": "live.numbox",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "float"
          ],
          "parameter_enable": 1,
          "patching_rect": [
            142.0,
            57.0,
            110.0,
            15.0
          ],
          "presentation": 1,
          "presentation_rect": [
            142.0,
            57.0,
            110.0,
            15.0
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_initial": [
                5
              ],
              "parameter_initial_enable": 1,
              "parameter_longname": "Attack ms",
              "parameter_mmax": 1000.0,
              "parameter_mmin": 1.0,
              "parameter_modmode": 0,
              "parameter_shortname": "Attack ms",
              "parameter_type": 0,
              "parameter_unitstyle": 0
            }
          },
          "varname": "attack"
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 10.0,
          "id": "releaseLabel",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            270.0,
            37.0,
            110.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            270.0,
            37.0,
            110.0,
            18.0
          ],
          "text": "Release ms",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "releaseLabel"
        }
      },
      {
        "box": {
          "id": "release",
          "maxclass": "live.numbox",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "float"
          ],
          "parameter_enable": 1,
          "patching_rect": [
            270.0,
            57.0,
            110.0,
            15.0
          ],
          "presentation": 1,
          "presentation_rect": [
            270.0,
            57.0,
            110.0,
            15.0
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_initial": [
                120
              ],
              "parameter_initial_enable": 1,
              "parameter_longname": "Release ms",
              "parameter_mmax": 2000.0,
              "parameter_mmin": 5.0,
              "parameter_modmode": 0,
              "parameter_shortname": "Release ms",
              "parameter_type": 0,
              "parameter_unitstyle": 0
            }
          },
          "varname": "release"
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 10.0,
          "id": "meterLabel",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            402.0,
            37.0,
            110.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            402.0,
            37.0,
            110.0,
            18.0
          ],
          "text": "Output",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "meterLabel"
        }
      },
      {
        "box": {
          "id": "meter",
          "maxclass": "meter~",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "float"
          ],
          "patching_rect": [
            404.0,
            57.0,
            160.0,
            20.0
          ],
          "presentation": 1,
          "presentation_rect": [
            404.0,
            57.0,
            160.0,
            20.0
          ]
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 11.0,
          "id": "midiStatus",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            590.0,
            18.0,
            560.0,
            19.0
          ],
          "presentation": 1,
          "presentation_rect": [
            590.0,
            18.0,
            560.0,
            19.0
          ],
          "text": "MIDI \u00b7 waiting for notes",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "midiStatus"
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 11.0,
          "id": "noteStatus",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            590.0,
            44.0,
            560.0,
            19.0
          ],
          "presentation": 1,
          "presentation_rect": [
            590.0,
            44.0,
            560.0,
            19.0
          ],
          "text": "Last note \u00b7 \u2014",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "noteStatus"
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 11.0,
          "id": "audioStatus",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            590.0,
            70.0,
            560.0,
            19.0
          ],
          "presentation": 1,
          "presentation_rect": [
            590.0,
            70.0,
            560.0,
            19.0
          ],
          "text": "Audio \u00b7 waiting for signal",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "audioStatus"
        }
      },
      {
        "box": {
          "fontname": "Arial",
          "fontsize": 10.0,
          "id": "status",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            14.0,
            148.0,
            1135.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            14.0,
            148.0,
            1135.0,
            18.0
          ],
          "text": "Ready \u00b7 Add to a generated MIDI track, then play its Arrangement clips.",
          "textcolor": [
            0.83,
            0.87,
            0.89,
            1.0
          ],
          "varname": "status"
        }
      },
      {
        "box": {
          "activebgcolor": [
            0.24,
            0.64,
            0.59,
            1.0
          ],
          "activetextcolor": [
            0.05,
            0.09,
            0.1,
            1.0
          ],
          "id": "resetButton",
          "maxclass": "live.text",
          "mode": 0,
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            590.0,
            103.0,
            150.0,
            25.0
          ],
          "presentation": 1,
          "presentation_rect": [
            590.0,
            103.0,
            150.0,
            25.0
          ],
          "saved_attribute_attributes": {
            "activebgcolor": {
              "expression": ""
            },
            "activetextcolor": {
              "expression": ""
            }
          },
          "text": "RESET STATS",
          "texton": "RESET STATS",
          "varname": "live.text"
        }
      },
      {
        "box": {
          "id": "resetButtonMessage",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            590.0,
            260.0,
            80.0,
            21.0
          ],
          "text": "reset"
        }
      },
      {
        "box": {
          "activebgcolor": [
            0.24,
            0.64,
            0.59,
            1.0
          ],
          "activetextcolor": [
            0.05,
            0.09,
            0.1,
            1.0
          ],
          "id": "panicButton",
          "maxclass": "live.text",
          "mode": 0,
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            752.0,
            103.0,
            120.0,
            25.0
          ],
          "presentation": 1,
          "presentation_rect": [
            752.0,
            103.0,
            120.0,
            25.0
          ],
          "saved_attribute_attributes": {
            "activebgcolor": {
              "expression": ""
            },
            "activetextcolor": {
              "expression": ""
            }
          },
          "text": "PANIC",
          "texton": "PANIC",
          "varname": "live.text[1]"
        }
      },
      {
        "box": {
          "id": "panicButtonMessage",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            752.0,
            260.0,
            80.0,
            21.0
          ],
          "text": "panic"
        }
      },
      {
        "box": {
          "activebgcolor": [
            0.24,
            0.64,
            0.59,
            1.0
          ],
          "activetextcolor": [
            0.05,
            0.09,
            0.1,
            1.0
          ],
          "id": "exportButton",
          "maxclass": "live.text",
          "mode": 0,
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            884.0,
            103.0,
            180.0,
            25.0
          ],
          "presentation": 1,
          "presentation_rect": [
            884.0,
            103.0,
            180.0,
            25.0
          ],
          "saved_attribute_attributes": {
            "activebgcolor": {
              "expression": ""
            },
            "activetextcolor": {
              "expression": ""
            }
          },
          "text": "EXPORT REPORT",
          "texton": "EXPORT REPORT",
          "varname": "live.text[2]"
        }
      },
      {
        "box": {
          "id": "noteIn",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "int",
            "int",
            "int"
          ],
          "patching_rect": [
            20.0,
            210.0,
            60.0,
            21.0
          ],
          "text": "notein"
        }
      },
      {
        "box": {
          "id": "notes",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            110.0,
            210.0,
            90.0,
            21.0
          ],
          "text": "pack 0 0"
        }
      },
      {
        "box": {
          "id": "poly",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 3,
          "outlettype": [
            "int",
            "int",
            "int"
          ],
          "patching_rect": [
            20.0,
            310.0,
            80.0,
            21.0
          ],
          "text": "poly 8 1"
        }
      },
      {
        "box": {
          "id": "voicePack",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            130.0,
            310.0,
            110.0,
            21.0
          ],
          "text": "pack 0 0 0"
        }
      },
      {
        "box": {
          "id": "route",
          "maxclass": "newobj",
          "numinlets": 9,
          "numoutlets": 9,
          "outlettype": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          "patching_rect": [
            20.0,
            360.0,
            250.0,
            21.0
          ],
          "text": "route 1 2 3 4 5 6 7 8"
        }
      },
      {
        "box": {
          "id": "voice1",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
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
              0.0,
              0.0,
              480.0,
              370.0
            ],
            "boxes": [
              {
                "box": {
                  "comment": "",
                  "id": "in",
                  "index": 1,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "trigger",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    55.0,
                    55.0,
                    22.0
                  ],
                  "text": "t l l"
                }
              },
              {
                "box": {
                  "id": "pitch",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    150.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "mtof",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    150.0,
                    135.0,
                    50.0,
                    22.0
                  ],
                  "text": "mtof"
                }
              },
              {
                "box": {
                  "id": "osc",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    175.0,
                    60.0,
                    22.0
                  ],
                  "text": "cycle~"
                }
              },
              {
                "box": {
                  "id": "velocity",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    15.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "scale",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "float"
                  ],
                  "patching_rect": [
                    15.0,
                    135.0,
                    65.0,
                    22.0
                  ],
                  "text": "/ 127."
                }
              },
              {
                "box": {
                  "id": "env",
                  "maxclass": "newobj",
                  "numinlets": 5,
                  "numoutlets": 4,
                  "outlettype": [
                    "signal",
                    "signal",
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    220.0,
                    170.0,
                    22.0
                  ],
                  "text": "adsr~ 5 40 0.8 120"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "attackIn",
                  "index": 2,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    300.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "releaseIn",
                  "index": 3,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    380.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "amp",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    270.0,
                    45.0,
                    22.0
                  ],
                  "text": "*~"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "out",
                  "index": 1,
                  "maxclass": "outlet",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    150.0,
                    315.0,
                    25.0,
                    25.0
                  ]
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "out",
                    0
                  ],
                  "source": [
                    "amp",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    1
                  ],
                  "source": [
                    "attackIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    1
                  ],
                  "source": [
                    "env",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "trigger",
                    0
                  ],
                  "source": [
                    "in",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "osc",
                    0
                  ],
                  "source": [
                    "mtof",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    0
                  ],
                  "source": [
                    "osc",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "mtof",
                    0
                  ],
                  "source": [
                    "pitch",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    4
                  ],
                  "source": [
                    "releaseIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    0
                  ],
                  "source": [
                    "scale",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "pitch",
                    0
                  ],
                  "source": [
                    "trigger",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "velocity",
                    0
                  ],
                  "source": [
                    "trigger",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "scale",
                    0
                  ],
                  "source": [
                    "velocity",
                    1
                  ]
                }
              }
            ],
            "saved_attribute_attributes": {
              "default_plcolor": {
                "expression": ""
              }
            }
          },
          "patching_rect": [
            20.0,
            420.0,
            125.0,
            21.0
          ],
          "saved_attribute_attributes": {
            "default_plcolor": {
              "expression": ""
            }
          },
          "text": "p sine_voice_1"
        }
      },
      {
        "box": {
          "id": "voice2",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
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
              0.0,
              0.0,
              480.0,
              370.0
            ],
            "boxes": [
              {
                "box": {
                  "comment": "",
                  "id": "in",
                  "index": 1,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "trigger",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    55.0,
                    55.0,
                    22.0
                  ],
                  "text": "t l l"
                }
              },
              {
                "box": {
                  "id": "pitch",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    150.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "mtof",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    150.0,
                    135.0,
                    50.0,
                    22.0
                  ],
                  "text": "mtof"
                }
              },
              {
                "box": {
                  "id": "osc",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    175.0,
                    60.0,
                    22.0
                  ],
                  "text": "cycle~"
                }
              },
              {
                "box": {
                  "id": "velocity",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    15.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "scale",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "float"
                  ],
                  "patching_rect": [
                    15.0,
                    135.0,
                    65.0,
                    22.0
                  ],
                  "text": "/ 127."
                }
              },
              {
                "box": {
                  "id": "env",
                  "maxclass": "newobj",
                  "numinlets": 5,
                  "numoutlets": 4,
                  "outlettype": [
                    "signal",
                    "signal",
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    220.0,
                    170.0,
                    22.0
                  ],
                  "text": "adsr~ 5 40 0.8 120"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "attackIn",
                  "index": 2,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    300.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "releaseIn",
                  "index": 3,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    380.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "amp",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    270.0,
                    45.0,
                    22.0
                  ],
                  "text": "*~"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "out",
                  "index": 1,
                  "maxclass": "outlet",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    150.0,
                    315.0,
                    25.0,
                    25.0
                  ]
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "out",
                    0
                  ],
                  "source": [
                    "amp",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    1
                  ],
                  "source": [
                    "attackIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    1
                  ],
                  "source": [
                    "env",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "trigger",
                    0
                  ],
                  "source": [
                    "in",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "osc",
                    0
                  ],
                  "source": [
                    "mtof",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    0
                  ],
                  "source": [
                    "osc",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "mtof",
                    0
                  ],
                  "source": [
                    "pitch",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    4
                  ],
                  "source": [
                    "releaseIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    0
                  ],
                  "source": [
                    "scale",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "pitch",
                    0
                  ],
                  "source": [
                    "trigger",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "velocity",
                    0
                  ],
                  "source": [
                    "trigger",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "scale",
                    0
                  ],
                  "source": [
                    "velocity",
                    1
                  ]
                }
              }
            ],
            "saved_attribute_attributes": {
              "default_plcolor": {
                "expression": ""
              }
            }
          },
          "patching_rect": [
            155.0,
            420.0,
            125.0,
            21.0
          ],
          "saved_attribute_attributes": {
            "default_plcolor": {
              "expression": ""
            }
          },
          "text": "p sine_voice_2"
        }
      },
      {
        "box": {
          "id": "voice3",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
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
              0.0,
              0.0,
              480.0,
              370.0
            ],
            "boxes": [
              {
                "box": {
                  "comment": "",
                  "id": "in",
                  "index": 1,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "trigger",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    55.0,
                    55.0,
                    22.0
                  ],
                  "text": "t l l"
                }
              },
              {
                "box": {
                  "id": "pitch",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    150.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "mtof",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    150.0,
                    135.0,
                    50.0,
                    22.0
                  ],
                  "text": "mtof"
                }
              },
              {
                "box": {
                  "id": "osc",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    175.0,
                    60.0,
                    22.0
                  ],
                  "text": "cycle~"
                }
              },
              {
                "box": {
                  "id": "velocity",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    15.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "scale",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "float"
                  ],
                  "patching_rect": [
                    15.0,
                    135.0,
                    65.0,
                    22.0
                  ],
                  "text": "/ 127."
                }
              },
              {
                "box": {
                  "id": "env",
                  "maxclass": "newobj",
                  "numinlets": 5,
                  "numoutlets": 4,
                  "outlettype": [
                    "signal",
                    "signal",
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    220.0,
                    170.0,
                    22.0
                  ],
                  "text": "adsr~ 5 40 0.8 120"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "attackIn",
                  "index": 2,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    300.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "releaseIn",
                  "index": 3,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    380.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "amp",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    270.0,
                    45.0,
                    22.0
                  ],
                  "text": "*~"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "out",
                  "index": 1,
                  "maxclass": "outlet",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    150.0,
                    315.0,
                    25.0,
                    25.0
                  ]
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "out",
                    0
                  ],
                  "source": [
                    "amp",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    1
                  ],
                  "source": [
                    "attackIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    1
                  ],
                  "source": [
                    "env",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "trigger",
                    0
                  ],
                  "source": [
                    "in",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "osc",
                    0
                  ],
                  "source": [
                    "mtof",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    0
                  ],
                  "source": [
                    "osc",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "mtof",
                    0
                  ],
                  "source": [
                    "pitch",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    4
                  ],
                  "source": [
                    "releaseIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    0
                  ],
                  "source": [
                    "scale",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "pitch",
                    0
                  ],
                  "source": [
                    "trigger",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "velocity",
                    0
                  ],
                  "source": [
                    "trigger",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "scale",
                    0
                  ],
                  "source": [
                    "velocity",
                    1
                  ]
                }
              }
            ],
            "saved_attribute_attributes": {
              "default_plcolor": {
                "expression": ""
              }
            }
          },
          "patching_rect": [
            290.0,
            420.0,
            125.0,
            21.0
          ],
          "saved_attribute_attributes": {
            "default_plcolor": {
              "expression": ""
            }
          },
          "text": "p sine_voice_3"
        }
      },
      {
        "box": {
          "id": "voice4",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
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
              0.0,
              0.0,
              480.0,
              370.0
            ],
            "boxes": [
              {
                "box": {
                  "comment": "",
                  "id": "in",
                  "index": 1,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "trigger",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    55.0,
                    55.0,
                    22.0
                  ],
                  "text": "t l l"
                }
              },
              {
                "box": {
                  "id": "pitch",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    150.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "mtof",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    150.0,
                    135.0,
                    50.0,
                    22.0
                  ],
                  "text": "mtof"
                }
              },
              {
                "box": {
                  "id": "osc",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    175.0,
                    60.0,
                    22.0
                  ],
                  "text": "cycle~"
                }
              },
              {
                "box": {
                  "id": "velocity",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    15.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "scale",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "float"
                  ],
                  "patching_rect": [
                    15.0,
                    135.0,
                    65.0,
                    22.0
                  ],
                  "text": "/ 127."
                }
              },
              {
                "box": {
                  "id": "env",
                  "maxclass": "newobj",
                  "numinlets": 5,
                  "numoutlets": 4,
                  "outlettype": [
                    "signal",
                    "signal",
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    220.0,
                    170.0,
                    22.0
                  ],
                  "text": "adsr~ 5 40 0.8 120"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "attackIn",
                  "index": 2,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    300.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "releaseIn",
                  "index": 3,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    380.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "amp",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    270.0,
                    45.0,
                    22.0
                  ],
                  "text": "*~"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "out",
                  "index": 1,
                  "maxclass": "outlet",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    150.0,
                    315.0,
                    25.0,
                    25.0
                  ]
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "out",
                    0
                  ],
                  "source": [
                    "amp",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    1
                  ],
                  "source": [
                    "attackIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    1
                  ],
                  "source": [
                    "env",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "trigger",
                    0
                  ],
                  "source": [
                    "in",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "osc",
                    0
                  ],
                  "source": [
                    "mtof",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    0
                  ],
                  "source": [
                    "osc",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "mtof",
                    0
                  ],
                  "source": [
                    "pitch",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    4
                  ],
                  "source": [
                    "releaseIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    0
                  ],
                  "source": [
                    "scale",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "pitch",
                    0
                  ],
                  "source": [
                    "trigger",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "velocity",
                    0
                  ],
                  "source": [
                    "trigger",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "scale",
                    0
                  ],
                  "source": [
                    "velocity",
                    1
                  ]
                }
              }
            ],
            "saved_attribute_attributes": {
              "default_plcolor": {
                "expression": ""
              }
            }
          },
          "patching_rect": [
            425.0,
            420.0,
            125.0,
            21.0
          ],
          "saved_attribute_attributes": {
            "default_plcolor": {
              "expression": ""
            }
          },
          "text": "p sine_voice_4"
        }
      },
      {
        "box": {
          "id": "voice5",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
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
              0.0,
              0.0,
              480.0,
              370.0
            ],
            "boxes": [
              {
                "box": {
                  "comment": "",
                  "id": "in",
                  "index": 1,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "trigger",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    55.0,
                    55.0,
                    22.0
                  ],
                  "text": "t l l"
                }
              },
              {
                "box": {
                  "id": "pitch",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    150.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "mtof",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    150.0,
                    135.0,
                    50.0,
                    22.0
                  ],
                  "text": "mtof"
                }
              },
              {
                "box": {
                  "id": "osc",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    175.0,
                    60.0,
                    22.0
                  ],
                  "text": "cycle~"
                }
              },
              {
                "box": {
                  "id": "velocity",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    15.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "scale",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "float"
                  ],
                  "patching_rect": [
                    15.0,
                    135.0,
                    65.0,
                    22.0
                  ],
                  "text": "/ 127."
                }
              },
              {
                "box": {
                  "id": "env",
                  "maxclass": "newobj",
                  "numinlets": 5,
                  "numoutlets": 4,
                  "outlettype": [
                    "signal",
                    "signal",
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    220.0,
                    170.0,
                    22.0
                  ],
                  "text": "adsr~ 5 40 0.8 120"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "attackIn",
                  "index": 2,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    300.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "releaseIn",
                  "index": 3,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    380.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "amp",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    270.0,
                    45.0,
                    22.0
                  ],
                  "text": "*~"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "out",
                  "index": 1,
                  "maxclass": "outlet",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    150.0,
                    315.0,
                    25.0,
                    25.0
                  ]
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "out",
                    0
                  ],
                  "source": [
                    "amp",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    1
                  ],
                  "source": [
                    "attackIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    1
                  ],
                  "source": [
                    "env",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "trigger",
                    0
                  ],
                  "source": [
                    "in",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "osc",
                    0
                  ],
                  "source": [
                    "mtof",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    0
                  ],
                  "source": [
                    "osc",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "mtof",
                    0
                  ],
                  "source": [
                    "pitch",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    4
                  ],
                  "source": [
                    "releaseIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    0
                  ],
                  "source": [
                    "scale",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "pitch",
                    0
                  ],
                  "source": [
                    "trigger",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "velocity",
                    0
                  ],
                  "source": [
                    "trigger",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "scale",
                    0
                  ],
                  "source": [
                    "velocity",
                    1
                  ]
                }
              }
            ],
            "saved_attribute_attributes": {
              "default_plcolor": {
                "expression": ""
              }
            }
          },
          "patching_rect": [
            560.0,
            420.0,
            125.0,
            21.0
          ],
          "saved_attribute_attributes": {
            "default_plcolor": {
              "expression": ""
            }
          },
          "text": "p sine_voice_5"
        }
      },
      {
        "box": {
          "id": "voice6",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
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
              0.0,
              0.0,
              480.0,
              370.0
            ],
            "boxes": [
              {
                "box": {
                  "comment": "",
                  "id": "in",
                  "index": 1,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "trigger",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    55.0,
                    55.0,
                    22.0
                  ],
                  "text": "t l l"
                }
              },
              {
                "box": {
                  "id": "pitch",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    150.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "mtof",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    150.0,
                    135.0,
                    50.0,
                    22.0
                  ],
                  "text": "mtof"
                }
              },
              {
                "box": {
                  "id": "osc",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    175.0,
                    60.0,
                    22.0
                  ],
                  "text": "cycle~"
                }
              },
              {
                "box": {
                  "id": "velocity",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    15.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "scale",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "float"
                  ],
                  "patching_rect": [
                    15.0,
                    135.0,
                    65.0,
                    22.0
                  ],
                  "text": "/ 127."
                }
              },
              {
                "box": {
                  "id": "env",
                  "maxclass": "newobj",
                  "numinlets": 5,
                  "numoutlets": 4,
                  "outlettype": [
                    "signal",
                    "signal",
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    220.0,
                    170.0,
                    22.0
                  ],
                  "text": "adsr~ 5 40 0.8 120"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "attackIn",
                  "index": 2,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    300.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "releaseIn",
                  "index": 3,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    380.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "amp",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    270.0,
                    45.0,
                    22.0
                  ],
                  "text": "*~"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "out",
                  "index": 1,
                  "maxclass": "outlet",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    150.0,
                    315.0,
                    25.0,
                    25.0
                  ]
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "out",
                    0
                  ],
                  "source": [
                    "amp",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    1
                  ],
                  "source": [
                    "attackIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    1
                  ],
                  "source": [
                    "env",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "trigger",
                    0
                  ],
                  "source": [
                    "in",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "osc",
                    0
                  ],
                  "source": [
                    "mtof",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    0
                  ],
                  "source": [
                    "osc",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "mtof",
                    0
                  ],
                  "source": [
                    "pitch",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    4
                  ],
                  "source": [
                    "releaseIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    0
                  ],
                  "source": [
                    "scale",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "pitch",
                    0
                  ],
                  "source": [
                    "trigger",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "velocity",
                    0
                  ],
                  "source": [
                    "trigger",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "scale",
                    0
                  ],
                  "source": [
                    "velocity",
                    1
                  ]
                }
              }
            ],
            "saved_attribute_attributes": {
              "default_plcolor": {
                "expression": ""
              }
            }
          },
          "patching_rect": [
            695.0,
            420.0,
            125.0,
            21.0
          ],
          "saved_attribute_attributes": {
            "default_plcolor": {
              "expression": ""
            }
          },
          "text": "p sine_voice_6"
        }
      },
      {
        "box": {
          "id": "voice7",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
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
              0.0,
              0.0,
              480.0,
              370.0
            ],
            "boxes": [
              {
                "box": {
                  "comment": "",
                  "id": "in",
                  "index": 1,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "trigger",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    55.0,
                    55.0,
                    22.0
                  ],
                  "text": "t l l"
                }
              },
              {
                "box": {
                  "id": "pitch",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    150.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "mtof",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    150.0,
                    135.0,
                    50.0,
                    22.0
                  ],
                  "text": "mtof"
                }
              },
              {
                "box": {
                  "id": "osc",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    175.0,
                    60.0,
                    22.0
                  ],
                  "text": "cycle~"
                }
              },
              {
                "box": {
                  "id": "velocity",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    15.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "scale",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "float"
                  ],
                  "patching_rect": [
                    15.0,
                    135.0,
                    65.0,
                    22.0
                  ],
                  "text": "/ 127."
                }
              },
              {
                "box": {
                  "id": "env",
                  "maxclass": "newobj",
                  "numinlets": 5,
                  "numoutlets": 4,
                  "outlettype": [
                    "signal",
                    "signal",
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    220.0,
                    170.0,
                    22.0
                  ],
                  "text": "adsr~ 5 40 0.8 120"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "attackIn",
                  "index": 2,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    300.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "releaseIn",
                  "index": 3,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    380.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "amp",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    270.0,
                    45.0,
                    22.0
                  ],
                  "text": "*~"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "out",
                  "index": 1,
                  "maxclass": "outlet",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    150.0,
                    315.0,
                    25.0,
                    25.0
                  ]
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "out",
                    0
                  ],
                  "source": [
                    "amp",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    1
                  ],
                  "source": [
                    "attackIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    1
                  ],
                  "source": [
                    "env",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "trigger",
                    0
                  ],
                  "source": [
                    "in",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "osc",
                    0
                  ],
                  "source": [
                    "mtof",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    0
                  ],
                  "source": [
                    "osc",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "mtof",
                    0
                  ],
                  "source": [
                    "pitch",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    4
                  ],
                  "source": [
                    "releaseIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    0
                  ],
                  "source": [
                    "scale",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "pitch",
                    0
                  ],
                  "source": [
                    "trigger",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "velocity",
                    0
                  ],
                  "source": [
                    "trigger",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "scale",
                    0
                  ],
                  "source": [
                    "velocity",
                    1
                  ]
                }
              }
            ],
            "saved_attribute_attributes": {
              "default_plcolor": {
                "expression": ""
              }
            }
          },
          "patching_rect": [
            830.0,
            420.0,
            125.0,
            21.0
          ],
          "saved_attribute_attributes": {
            "default_plcolor": {
              "expression": ""
            }
          },
          "text": "p sine_voice_7"
        }
      },
      {
        "box": {
          "id": "voice8",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
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
              0.0,
              0.0,
              480.0,
              370.0
            ],
            "boxes": [
              {
                "box": {
                  "comment": "",
                  "id": "in",
                  "index": 1,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "trigger",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    55.0,
                    55.0,
                    22.0
                  ],
                  "text": "t l l"
                }
              },
              {
                "box": {
                  "id": "pitch",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    150.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "mtof",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    150.0,
                    135.0,
                    50.0,
                    22.0
                  ],
                  "text": "mtof"
                }
              },
              {
                "box": {
                  "id": "osc",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    175.0,
                    60.0,
                    22.0
                  ],
                  "text": "cycle~"
                }
              },
              {
                "box": {
                  "id": "velocity",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 2,
                  "outlettype": [
                    "int",
                    "int"
                  ],
                  "patching_rect": [
                    15.0,
                    95.0,
                    95.0,
                    22.0
                  ],
                  "text": "unpack 0 0"
                }
              },
              {
                "box": {
                  "id": "scale",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "float"
                  ],
                  "patching_rect": [
                    15.0,
                    135.0,
                    65.0,
                    22.0
                  ],
                  "text": "/ 127."
                }
              },
              {
                "box": {
                  "id": "env",
                  "maxclass": "newobj",
                  "numinlets": 5,
                  "numoutlets": 4,
                  "outlettype": [
                    "signal",
                    "signal",
                    "",
                    ""
                  ],
                  "patching_rect": [
                    15.0,
                    220.0,
                    170.0,
                    22.0
                  ],
                  "text": "adsr~ 5 40 0.8 120"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "attackIn",
                  "index": 2,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    300.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "releaseIn",
                  "index": 3,
                  "maxclass": "inlet",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    380.0,
                    15.0,
                    25.0,
                    25.0
                  ]
                }
              },
              {
                "box": {
                  "id": "amp",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    150.0,
                    270.0,
                    45.0,
                    22.0
                  ],
                  "text": "*~"
                }
              },
              {
                "box": {
                  "comment": "",
                  "id": "out",
                  "index": 1,
                  "maxclass": "outlet",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    150.0,
                    315.0,
                    25.0,
                    25.0
                  ]
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "out",
                    0
                  ],
                  "source": [
                    "amp",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    1
                  ],
                  "source": [
                    "attackIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    1
                  ],
                  "source": [
                    "env",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "trigger",
                    0
                  ],
                  "source": [
                    "in",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "osc",
                    0
                  ],
                  "source": [
                    "mtof",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "amp",
                    0
                  ],
                  "source": [
                    "osc",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "mtof",
                    0
                  ],
                  "source": [
                    "pitch",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    4
                  ],
                  "source": [
                    "releaseIn",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "env",
                    0
                  ],
                  "source": [
                    "scale",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "pitch",
                    0
                  ],
                  "source": [
                    "trigger",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "velocity",
                    0
                  ],
                  "source": [
                    "trigger",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "scale",
                    0
                  ],
                  "source": [
                    "velocity",
                    1
                  ]
                }
              }
            ],
            "saved_attribute_attributes": {
              "default_plcolor": {
                "expression": ""
              }
            }
          },
          "patching_rect": [
            965.0,
            420.0,
            125.0,
            21.0
          ],
          "saved_attribute_attributes": {
            "default_plcolor": {
              "expression": ""
            }
          },
          "text": "p sine_voice_8"
        }
      },
      {
        "box": {
          "id": "sum",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            20.0,
            510.0,
            50.0,
            21.0
          ],
          "text": "+~"
        }
      },
      {
        "box": {
          "id": "normalize",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            20.0,
            550.0,
            85.0,
            21.0
          ],
          "text": "*~ 0.125"
        }
      },
      {
        "box": {
          "id": "levelScale",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "float"
          ],
          "patching_rect": [
            310.0,
            220.0,
            65.0,
            21.0
          ],
          "text": "/ 100."
        }
      },
      {
        "box": {
          "id": "gainRamp",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            310.0,
            260.0,
            90.0,
            21.0
          ],
          "text": "pack 0. 20"
        }
      },
      {
        "box": {
          "id": "gainSignal",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 2,
          "outlettype": [
            "signal",
            "bang"
          ],
          "patching_rect": [
            310.0,
            300.0,
            85.0,
            21.0
          ],
          "text": "line~ 0.7"
        }
      },
      {
        "box": {
          "id": "gain",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            20.0,
            590.0,
            50.0,
            21.0
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "id": "protect",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            20.0,
            630.0,
            145.0,
            21.0
          ],
          "text": "clip~ -0.98 0.98"
        }
      },
      {
        "box": {
          "id": "out",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 2,
          "outlettype": [
            "signal",
            "signal"
          ],
          "patching_rect": [
            20.0,
            720.0,
            80.0,
            21.0
          ],
          "text": "plugout~"
        }
      },
      {
        "box": {
          "id": "peak",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "float"
          ],
          "patching_rect": [
            210.0,
            630.0,
            130.0,
            21.0
          ],
          "text": "peakamp~ 100"
        }
      },
      {
        "box": {
          "id": "peakMessage",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            210.0,
            670.0,
            120.0,
            21.0
          ],
          "text": "prepend peak"
        }
      },
      {
        "box": {
          "id": "stopVoices",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            752.0,
            300.0,
            70.0,
            21.0
          ],
          "text": "stop"
        }
      },
      {
        "box": {
          "id": "saveDialog",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "",
            "",
            "bang"
          ],
          "patching_rect": [
            884.0,
            260.0,
            145.0,
            21.0
          ],
          "text": "savedialog TEXT"
        }
      },
      {
        "box": {
          "id": "writeMessage",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            884.0,
            300.0,
            125.0,
            21.0
          ],
          "text": "prepend write"
        }
      },
      {
        "box": {
          "id": "thisDevice",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "bang",
            "int",
            "int"
          ],
          "patching_rect": [
            470.0,
            210.0,
            100.0,
            21.0
          ],
          "text": "live.thisdevice"
        }
      },
      {
        "box": {
          "id": "initDefer",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            470.0,
            250.0,
            70.0,
            21.0
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "initMessage",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            470.0,
            290.0,
            50.0,
            21.0
          ],
          "text": "init"
        }
      },
      {
        "box": {
          "code": "/* Embedded diagnostic state; the audio path itself uses native Max/MSP objects. */\nvar SineDiagnostics = (function () {\n    function create(now) {\n        const clock = now || (() => Date.now());\n        let state, held = {};\n        function reset() {\n            state = {version:1, startedAt:new Date(clock()).toISOString(), noteOns:0, noteOffs:0,\n                maxHeld:heldCount(), minPitch:null, maxPitch:null, lastPitch:null, lastVelocity:0,\n                peak:0, peakWindows:0, audibleWindows:0, panicCount:0, events:[], eventsTruncated:false};\n        }\n        function heldCount() { return Object.values(held).reduce((a,b)=>a+b,0); }\n        function note(pitch, velocity) {\n            if (!Number.isInteger(pitch) || pitch<0 || pitch>127 || !Number.isInteger(velocity) || velocity<0 || velocity>127)\n                throw new Error('MIDI pitch and velocity must be integers from 0 to 127.');\n            state.lastPitch=pitch; state.lastVelocity=velocity;\n            if (velocity) {\n                state.noteOns++; held[pitch]=(held[pitch]||0)+1;\n                state.minPitch=state.minPitch===null?pitch:Math.min(state.minPitch,pitch);\n                state.maxPitch=state.maxPitch===null?pitch:Math.max(state.maxPitch,pitch);\n                state.maxHeld=Math.max(state.maxHeld,heldCount());\n            } else { state.noteOffs++; held[pitch]=Math.max(0,(held[pitch]||0)-1); }\n            if(state.events.length<20000) state.events.push({time:clock(),pitch,velocity});\n            else state.eventsTruncated=true;\n        }\n        function peak(value) {\n            if (!Number.isFinite(value) || value<0) return;\n            state.peak=Math.max(state.peak,value); state.peakWindows++;\n            if(value>0.00001)state.audibleWindows++;\n        }\n        function panic() { held={};state.panicCount++; }\n        function report() {\n            return {...JSON.parse(JSON.stringify(state)),heldNotes:heldCount(),\n                lastFrequencyHz:state.lastPitch===null?null:440*Math.pow(2,(state.lastPitch-69)/12),\n                midiReceived:state.noteOns>0,audioObserved:state.audibleWindows>0,\n                peakDbFS:state.peak>0?20*Math.log10(state.peak):null};\n        }\n        reset(); return {reset,note,peak,panic,report};\n    }\n    return {create};\n}());\nif(typeof module!=='undefined')module.exports=SineDiagnostics;\n\n/* Max UI adapter. No global Live API access and no network calls. */\nif(typeof outlet!=='undefined') {\n    inlets=1;outlets=1;\n    var monitor=SineDiagnostics.create();\n    function show() {\n        const r=monitor.report();\n        this.patcher.getnamed('midiStatus').message('set',r.midiReceived?\n            'MIDI received \u00b7 On '+r.noteOns+' / Off '+r.noteOffs+' \u00b7 Held '+r.heldNotes+' (max '+r.maxHeld+')':'MIDI \u00b7 waiting for notes');\n        this.patcher.getnamed('noteStatus').message('set',r.lastPitch===null?'Last note \u00b7 \u2014':\n            'Last note '+r.lastPitch+' \u00b7 velocity '+r.lastVelocity+' \u00b7 '+r.lastFrequencyHz.toFixed(2)+' Hz');\n        this.patcher.getnamed('audioStatus').message('set',r.audioObserved?\n            'Audio observed \u00b7 max '+r.peak.toFixed(5)+' ('+r.peakDbFS.toFixed(1)+' dBFS)':'Audio \u00b7 waiting for signal');\n    }\n    function init() {\n        ['level','attack','release'].forEach(name=>this.patcher.getnamed(name).message('bang'));\n        show();outlet(0,'set','Ready \u00b7 Add to a generated MIDI track, then play its Arrangement clips.');\n    }\n    function list(pitch,velocity) { monitor.note(Number(pitch),Number(velocity));show(); }\n    function peak(value) { monitor.peak(Number(value));show(); }\n    function reset() { monitor.reset();show();outlet(0,'set','Statistics reset. Play MIDI to test input and audio.'); }\n    function panic() { monitor.panic();show();outlet(0,'set','Panic \u00b7 all voices released.'); }\n    function write(path) {\n        let file=null;\n        try {\n            file=new File(path,'write','TEXT');\n            if(!file.isopen)throw new Error('Cannot open the selected file.');\n            file.eof=0;file.writestring(JSON.stringify(monitor.report(),null,2)+'\\n');file.close();file=null;\n            outlet(0,'set','Diagnostic report saved.');\n        } catch(e) { if(file)file.close();outlet(0,'set','Report error \u00b7 '+e.message); }\n    }\n}\n",
          "filename": "none",
          "fontface": 0,
          "fontname": "<Monospaced>",
          "fontsize": 11.0,
          "id": "diagnostics",
          "maxclass": "v8.codebox",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            590.0,
            370.0,
            550.0,
            350.0
          ],
          "saved_object_attributes": {
            "parameter_enable": 0
          }
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "destination": [
            "voice1",
            1
          ],
          "order": 7,
          "source": [
            "attack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice2",
            1
          ],
          "order": 6,
          "source": [
            "attack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice3",
            1
          ],
          "order": 5,
          "source": [
            "attack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice4",
            1
          ],
          "order": 4,
          "source": [
            "attack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice5",
            1
          ],
          "order": 3,
          "source": [
            "attack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice6",
            1
          ],
          "order": 2,
          "source": [
            "attack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice7",
            1
          ],
          "order": 1,
          "source": [
            "attack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice8",
            1
          ],
          "order": 0,
          "source": [
            "attack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "status",
            0
          ],
          "source": [
            "diagnostics",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "saveDialog",
            0
          ],
          "source": [
            "exportButton",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "protect",
            0
          ],
          "source": [
            "gain",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "gainSignal",
            0
          ],
          "source": [
            "gainRamp",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "gain",
            1
          ],
          "source": [
            "gainSignal",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "initMessage",
            0
          ],
          "source": [
            "initDefer",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "diagnostics",
            0
          ],
          "source": [
            "initMessage",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "levelScale",
            0
          ],
          "source": [
            "level",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "gainRamp",
            0
          ],
          "source": [
            "levelScale",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "gain",
            0
          ],
          "source": [
            "normalize",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "notes",
            1
          ],
          "order": 0,
          "source": [
            "noteIn",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "notes",
            0
          ],
          "order": 0,
          "source": [
            "noteIn",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "poly",
            1
          ],
          "order": 1,
          "source": [
            "noteIn",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "poly",
            0
          ],
          "order": 1,
          "source": [
            "noteIn",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "diagnostics",
            0
          ],
          "source": [
            "notes",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "panicButtonMessage",
            0
          ],
          "order": 1,
          "source": [
            "panicButton",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "stopVoices",
            0
          ],
          "order": 0,
          "source": [
            "panicButton",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "diagnostics",
            0
          ],
          "source": [
            "panicButtonMessage",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "peakMessage",
            0
          ],
          "source": [
            "peak",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "diagnostics",
            0
          ],
          "source": [
            "peakMessage",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voicePack",
            2
          ],
          "source": [
            "poly",
            2
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voicePack",
            1
          ],
          "source": [
            "poly",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voicePack",
            0
          ],
          "source": [
            "poly",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "meter",
            0
          ],
          "order": 0,
          "source": [
            "protect",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "out",
            1
          ],
          "order": 2,
          "source": [
            "protect",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "out",
            0
          ],
          "order": 3,
          "source": [
            "protect",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "peak",
            0
          ],
          "order": 1,
          "source": [
            "protect",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice1",
            2
          ],
          "order": 7,
          "source": [
            "release",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice2",
            2
          ],
          "order": 6,
          "source": [
            "release",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice3",
            2
          ],
          "order": 5,
          "source": [
            "release",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice4",
            2
          ],
          "order": 4,
          "source": [
            "release",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice5",
            2
          ],
          "order": 3,
          "source": [
            "release",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice6",
            2
          ],
          "order": 2,
          "source": [
            "release",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice7",
            2
          ],
          "order": 1,
          "source": [
            "release",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice8",
            2
          ],
          "order": 0,
          "source": [
            "release",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "resetButtonMessage",
            0
          ],
          "source": [
            "resetButton",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "diagnostics",
            0
          ],
          "source": [
            "resetButtonMessage",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice1",
            0
          ],
          "source": [
            "route",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice2",
            0
          ],
          "source": [
            "route",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice3",
            0
          ],
          "source": [
            "route",
            2
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice4",
            0
          ],
          "source": [
            "route",
            3
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice5",
            0
          ],
          "source": [
            "route",
            4
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice6",
            0
          ],
          "source": [
            "route",
            5
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice7",
            0
          ],
          "source": [
            "route",
            6
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "voice8",
            0
          ],
          "source": [
            "route",
            7
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "writeMessage",
            0
          ],
          "source": [
            "saveDialog",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "poly",
            0
          ],
          "source": [
            "stopVoices",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "normalize",
            0
          ],
          "source": [
            "sum",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "initDefer",
            0
          ],
          "source": [
            "thisDevice",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "sum",
            0
          ],
          "source": [
            "voice1",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "sum",
            0
          ],
          "source": [
            "voice2",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "sum",
            0
          ],
          "source": [
            "voice3",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "sum",
            0
          ],
          "source": [
            "voice4",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "sum",
            0
          ],
          "source": [
            "voice5",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "sum",
            0
          ],
          "source": [
            "voice6",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "sum",
            0
          ],
          "source": [
            "voice7",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "sum",
            0
          ],
          "source": [
            "voice8",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "route",
            0
          ],
          "source": [
            "voicePack",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "diagnostics",
            0
          ],
          "source": [
            "writeMessage",
            0
          ]
        }
      }
    ],
    "parameters": {
      "attack": [
        "Attack ms",
        "Attack ms",
        0
      ],
      "level": [
        "Level %",
        "Level %",
        0
      ],
      "release": [
        "Release ms",
        "Release ms",
        0
      ],
      "parameterbanks": {
        "0": {
          "index": 0,
          "name": "",
          "parameters": [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          "buttons": [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ]
        }
      },
      "inherited_shortname": 1
    },
    "latency": 0,
    "is_mpe": 0,
    "external_mpe_tuning_enabled": 0,
    "minimum_live_version": "",
    "minimum_max_version": "",
    "platform_compatibility": 0,
    "project": {
      "version": 1,
      "creationdate": 3875687285,
      "modificationdate": 3875687285,
      "viewrect": [
        0.0,
        0.0,
        300.0,
        500.0
      ],
      "autoorganize": 1,
      "hideprojectwindow": 1,
      "showdependencies": 1,
      "autolocalize": 0,
      "contents": {
        "patchers": {}
      },
      "layout": {},
      "searchpath": {},
      "detailsvisible": 0,
      "amxdtype": 1768515945,
      "readonly": 0,
      "devpathtype": 0,
      "devpath": ".",
      "sortmode": 0,
      "viewmode": 0,
      "includepackages": 0
    },
    "autosave": 0,
    "bgcolor": [
      0.13,
      0.16,
      0.18,
      1.0
    ],
    "saved_attribute_attributes": {
      "default_plcolor": {
        "expression": ""
      },
      "locked_bgcolor": {
        "expression": ""
      }
    },
    "oscreceiveudpport": 0
  }
}
