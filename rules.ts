import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      {
        type: "basic",
        description: "Disable CMD + Tab to force Hyper Key usage",
        from: {
          key_code: "tab",
          modifiers: {
            mandatory: ["left_command"],
          },
        },
        to: [
          {
            key_code: "tab",
          },
        ],
      },
      {
        type: "basic",
        description: "Single Quote -> Hyper Key",
        from: {
          key_code: "backslash",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "backslash",
          },
        ],
      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      w: app("WhatsApp"),
      v: app("Visual Studio Code"),
      s: app("Safari"),
      r: app("RemNote"),
      c: app("Slack"),
      p: app("Spotify"),
      t: app("Tandem"),
      g: app("Google Chrome"),
      d: app("Google Chrome Canary"),
      l: open("https://linear.app"),
    },
    get spacebar() {
      return this.o;
    },
    w: {
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
    },
    // s = "System"
    s: {
      i: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      o: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      // e: {
      //   to: [
      //     {
      //       // Emoji picker
      //       key_code: "spacebar",
      //       modifiers: ["right_control", "right_command"],
      //     },
      //   ],
      // },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      // m: {
      //   to: [{ key_code: "f", modifiers: ["right_control"] }],
      // },
      // // Scroll mode via homerow.app
      // s: {
      //   to: [{ key_code: "j", modifiers: ["right_control"] }],
      // },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
