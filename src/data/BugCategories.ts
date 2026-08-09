import Ladybug from "/ladybug-anim.png?url";
import Cockroach from "/cockroach-anim.png?url";
import type { BugCategory } from "../types";

const bugCategories: BugCategory[] = [
  {
    name: "True Bugs (Hemiptera)",
    description:
      "Insects defined by piercing-sucking mouthparts called a rostrum, used to feed on plant sap or animal fluids.",
    subcategories: [
      {
        name: "Stink Bugs",
        description:
          "Shield-shaped insects known for releasing a pungent, foul-smelling chemical deterrent when threatened or crushed.",
        samples: [],
      },
      {
        name: "Cicadas",
        description:
          "Large, winged insects famous for the loud, buzzing mating songs produced by the vibrating tymbals of males.",
        samples: [],
      },
      {
        name: "Aphids",
        description:
          "Tiny, soft-bodied garden pests that multiply rapidly and secrete a sticky, sweet fluid called honeydew.",
        samples: [],
      },
      {
        name: "Bedbugs",
        description:
          "Small, flat, wingless nocturnal parasites that hide in cracks and feed exclusively on warm-blooded hosts.",
        samples: [],
      },
    ],
  },
  {
    name: "Beetles (Coleoptera)",
    description:
      "The largest order of organisms on Earth, easily recognized by their hardened, protective forewings called elytra.",
    subcategories: [
      {
        name: "Ladybirds & Ladybugs",
        description:
          "Domed, brightly coloured beetles that act as natural pest control by voraciously eating garden aphids.",
        samples: [
          {
            label: "Convergent Lady Beetle",
            bugCount: 4,
            src: Ladybug,
          },
        ],
      },
      {
        name: "Weevils",
        description:
          "Herbivorous beetles most easily identified by their distinct, elongated snouts used to bore into seeds and grain.",
        samples: [],
      },
      {
        name: "Scarab Beetles",
        description:
          "Stout-bodied beetles with clubbed antennae, including ecological recyclers like dung rollers and massive horned species.",
        samples: [],
      },
      {
        name: "Ground Beetles",
        description:
          "Fast-running, shiny, or metallic nocturnal predators that hunt heavily along the soil surface.",
        samples: [],
      },
    ],
  },
  {
    name: "Butterflies & Moths (Lepidoptera)",
    description:
      "Insects with large, broad wings covered in microscopic scales, undergoing complete metamorphosis from caterpillars.",
    subcategories: [
      {
        name: "Swallowtails",
        description:
          "Large, vividly patterned butterflies featuring elegant, tail-like extensions on their hindwings.",
        samples: [],
      },
      {
        name: "Hawk Moths",
        description:
          "Heavy-bodied, powerful flyers with narrow wings, capable of hovering mid-air like hummingbirds to drink nectar.",
        samples: [],
      },
      {
        name: "Brush-footed Butterflies",
        description:
          "The largest butterfly family, named for their short, hairy front legs that look like small brushes.",
        samples: [],
      },
    ],
  },
  {
    name: "Bees, Ants, & Wasps (Hymenoptera)",
    description:
      "Highly social insects with narrow waists, many of which form complex, structured colonies with distinct worker castes.",
    subcategories: [
      {
        name: "Bees",
        description:
          "Furry-bodied, pollen-collecting insects vital to global agriculture and the health of flowering plants.",
        samples: [],
      },
      {
        name: "Ants",
        description:
          "Eusocial, mostly wingless ground-dwellers known for complex trail systems, heavy lifting, and underground fortresses.",
        samples: [],
      },
      {
        name: "Wasps & Hornets",
        description:
          "Predatory or parasitic insects with smooth bodies, narrow waists, and potent, reusable defensive stingers.",
        samples: [],
      },
    ],
  },
  {
    name: "Flies & Mosquitoes (Diptera)",
    description:
      "Insects with only two functional flight wings and a second pair reduced into small, knob-like balancing organs.",
    subcategories: [
      {
        name: "Houseflies",
        description:
          "Common worldwide scavengers with sponge-like mouthparts that rapidly liquefy food and spread pathogens.",
        samples: [],
      },
      {
        name: "Hoverflies",
        description:
          "Harmless, nectar-feeding flies that mimic the stripes of bees and wasps to trick potential predators.",
        samples: [],
      },
      {
        name: "Mosquitoes",
        description:
          "Slender, long-legged aquatic-breeding flies whose females use needle-like mouthparts to pierce skin for blood meals.",
        samples: [],
      },
    ],
  },
  {
    name: "Cockroaches & Termites (Blattodea)",
    description:
      "Ancient, resilient insects ranging from highly social wood-destroyers to opportunistic, flat-bodied nocturnal scavengers.",
    subcategories: [
      {
        name: "Pest Cockroaches",
        description:
          "Highly adaptable, fast-moving household scavengers known for surviving harsh conditions and tight spaces.",
        samples: [
          {
            label: "American Cockroach",
            bugCount: 2,
            src: Cockroach,
          },
        ],
      },
      {
        name: "Wild & Giant Cockroaches",
        description:
          "Large, non-pest forest dwellers that serve as vital ecological recyclers by breaking down leaf litter and wood.",
        samples: [],
      },
      {
        name: "Termites",
        description:
          "Eusocial insects famous for building massive mounds and consuming cellulose with the help of symbiotic gut microbes.",
        samples: [],
      },
    ],
  },
];

export default bugCategories;
