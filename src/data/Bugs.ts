const Ant = "../assets/ant-anim.png";
const Aphid = "../assets/aphid-anim.png";
const Bee = "../assets/bee-anim.png";
const Bedbug = "../assets/bedbug-anim.png";
const BrushFootedButterfly = "../assets/brush-footed-butterfly-anim.png";
const CockroachLarge = "../assets/cockroach-large-anim.png";
const Fly = "../assets/fly-anim.png";
const GroundBeetle = "../assets/ground-beetle-anim.png";
const Hawkmoth = "../assets/hawkmoth-anim.png";
const Hoverfly = "../assets/hoverfly-anim.png";
const Mosquito = "../assets/mosquito-anim.png";
const Scarab = "../assets/scarab-anim.png";
const Shallowtail = "../assets/shallowtail-anim.png";
const StagBettle = "../assets/stag-beetle-anim.png";
const Termite = "../assets/termite-anim.png";
const Wasp = "../assets/wasp-anim.png";
const Weevil = "../assets/weevil-anim.png";

const Ladybug = "../assets/ladybug-anim.png";
const Cockroach = "../assets/cockroach-anim.png";
const StinkBug = "../assets/stinkbug-anim.png";
const Cicada = "../assets/cicadas-anim.png";

export const bugImageModules = import.meta.glob("../assets/*-anim.png");

import type { BugSubcategory, BugCategory, Bug } from "../types";

const bugCategories: Record<string, BugCategory> = {
  trueBugs: {
    name: "True Bugs (Hemiptera)",
    description:
      "Insects defined by piercing-sucking mouthparts called a rostrum, used to feed on plant sap or animal fluids.",
  },
  beetles: {
    name: "Beetles (Coleoptera)",
    description:
      "The largest order of organisms on Earth, easily recognized by their hardened, protective forewings called elytra.",
  },
  butterfliesMoths: {
    name: "Butterflies & Moths (Lepidoptera)",
    description:
      "Insects with large, broad wings covered in microscopic scales, undergoing complete metamorphosis from caterpillars.",
  },
  beesAntsWasps: {
    name: "Bees, Ants, & Wasps (Hymenoptera)",
    description:
      "Highly social insects with narrow waists, many of which form complex, structured colonies with distinct worker castes.",
  },
  fliesMosquitoes: {
    name: "Flies & Mosquitoes (Diptera)",
    description:
      "Insects with only two functional flight wings and a second pair reduced into small, knob-like balancing organs.",
  },
  cockroachesTermites: {
    name: "Cockroaches & Termites (Blattodea)",
    description:
      "Ancient, resilient insects ranging from highly social wood-destroyers to opportunistic, flat-bodied nocturnal scavengers.",
  },
};

const bugSubcategories: Record<string, BugSubcategory> = {
  stinkBugs: {
    name: "Stink Bugs",
    bugCategory: bugCategories.trueBugs,
    description:
      "Shield-shaped insects known for releasing a pungent, foul-smelling chemical deterrent when threatened or crushed.",
  },
  cicadas: {
    name: "Cicadas",
    description:
      "Large, winged insects famous for the loud, buzzing mating songs produced by the vibrating tymbals of males.",
    bugCategory: bugCategories.trueBugs,
  },
  aphids: {
    name: "Aphids",
    bugCategory: bugCategories.trueBugs,
    description:
      "Tiny, soft-bodied garden pests that multiply rapidly and secrete a sticky, sweet fluid called honeydew.",
  },
  bedbugs: {
    name: "Bedbugs",
    bugCategory: bugCategories.trueBugs,
    description:
      "Small, flat, wingless nocturnal parasites that hide in cracks and feed exclusively on warm-blooded hosts.",
  },
  ladybirdsLadybugs: {
    name: "Ladybirds & Ladybugs",
    bugCategory: bugCategories.beetles,
    description:
      "Domed, brightly coloured beetles that act as natural pest control by voraciously eating garden aphids.",
  },
  weevils: {
    name: "Weevils",
    bugCategory: bugCategories.beetles,
    description:
      "Herbivorous beetles most easily identified by their distinct, elongated snouts used to bore into seeds and grain.",
  },
  scarabBeetles: {
    name: "Scarab Beetles",
    bugCategory: bugCategories.beetles,
    description:
      "Stout-bodied beetles with clubbed antennae, including ecological recyclers like dung rollers and massive horned species.",
  },
  groundBeetles: {
    name: "Ground Beetles",
    bugCategory: bugCategories.beetles,
    description:
      "Fast-running, shiny, or metallic nocturnal predators that hunt heavily along the soil surface.",
  },
  swallowtails: {
    name: "Swallowtails",
    bugCategory: bugCategories.butterfliesMoths,
    description:
      "Large, vividly patterned butterflies featuring elegant, tail-like extensions on their hindwings.",
  },
  hawkMoths: {
    name: "Hawk Moths",
    bugCategory: bugCategories.butterfliesMoths,
    description:
      "Heavy-bodied, powerful flyers with narrow wings, capable of hovering mid-air like hummingbirds to drink nectar.",
  },
  brushFootedButterflies: {
    name: "Brush-footed Butterflies",
    bugCategory: bugCategories.butterfliesMoths,
    description:
      "The largest butterfly family, named for their short, hairy front legs that look like small brushes.",
  },
  bees: {
    name: "Bees",
    bugCategory: bugCategories.beesAntsWasps,
    description:
      "Furry-bodied, pollen-collecting insects vital to global agriculture and the health of flowering plants.",
  },
  ants: {
    name: "Ants",
    bugCategory: bugCategories.beesAntsWasps,
    description:
      "Eusocial, mostly wingless ground-dwellers known for complex trail systems, heavy lifting, and underground fortresses.",
  },
  waspsHornets: {
    name: "Wasps & Hornets",
    bugCategory: bugCategories.beesAntsWasps,
    description:
      "Predatory or parasitic insects with smooth bodies, narrow waists, and potent, reusable defensive stingers.",
  },
  houseflies: {
    name: "Houseflies",
    bugCategory: bugCategories.fliesMosquitoes,
    description:
      "Common worldwide scavengers with sponge-like mouthparts that rapidly liquefy food and spread pathogens.",
  },
  hoverflies: {
    name: "Hoverflies",
    bugCategory: bugCategories.fliesMosquitoes,
    description:
      "Harmless, nectar-feeding flies that mimic the stripes of bees and wasps to trick potential predators.",
  },
  mosquitoes: {
    name: "Mosquitoes",
    bugCategory: bugCategories.fliesMosquitoes,
    description:
      "Slender, long-legged aquatic-breeding flies whose females use needle-like mouthparts to pierce skin for blood meals.",
  },
  pestCockroaches: {
    name: "Pest Cockroaches",
    bugCategory: bugCategories.cockroachesTermites,
    description:
      "Highly adaptable, fast-moving household scavengers known for surviving harsh conditions and tight spaces.",
  },
  wildGiantCockroaches: {
    name: "Wild & Giant Cockroaches",
    bugCategory: bugCategories.cockroachesTermites,
    description:
      "Large, non-pest forest dwellers that serve as vital ecological recyclers by breaking down leaf litter and wood.",
  },
  termites: {
    name: "Termites",
    bugCategory: bugCategories.cockroachesTermites,
    description:
      "Eusocial insects famous for building massive mounds and consuming cellulose with the help of symbiotic gut microbes.",
  },
};

const bugs: Bug[] = [
  {
    id: "convergent-lady-beetle",
    label: "Convergent Lady Beetle",
    bugCount: 4,
    src: StinkBug,
    subcategory: bugSubcategories.stinkBug,
  },
  {
    id: "cicada",
    label: "Cicada",
    bugCount: 5,
    src: Cicada,
    size: "500px",
    subcategory: bugSubcategories.cicadas,
  },
  {
    id: "aphid",
    label: "Aphid",
    bugCount: 50,
    src: Aphid,
    subcategory: bugSubcategories.aphids,
  },
  {
    id: "bedbug",
    label: "Bed Bug",
    bugCount: 25,
    src: Bedbug,
    subcategory: bugSubcategories.bedbugs,
  },
  {
    id: "convergent-lady-beetle",
    label: "Convergent Lady Beetle",
    bugCount: 25,
    src: Ladybug,
    subcategory: bugSubcategories.ladybirdsLadybugs,
  },
  {
    id: "weevil",
    label: "Weevil",
    bugCount: 25,
    src: Weevil,
    size: "500px",
    subcategory: bugSubcategories.weevils,
  },
  {
    id: "scarab",
    label: "Scarab",
    bugCount: 5,
    src: Scarab,
    size: "500px",
    subcategory: bugSubcategories.scarabBeetles,
  },
  {
    id: "stag-beetle",
    label: "Stag Beetle",
    bugCount: 5,
    src: StagBettle,
    size: "500px",
    subcategory: bugSubcategories.scarabBeetles,
  },
  {
    id: "ground-beetle",
    label: "Ground Beetle",
    bugCount: 5,
    src: GroundBeetle,
    subcategory: bugSubcategories.groundBeetles,
  },
  {
    id: "shallow-tail",
    label: "Shallow Tail",
    bugCount: 5,
    src: Shallowtail,
    size: "500px",
    subcategory: bugSubcategories.swallowtails,
  },
  {
    id: "hawkmoth",
    label: "Hawk Moth",
    bugCount: 5,
    src: Hawkmoth,
    size: "500px",
    subcategory: bugSubcategories.hawkMoths,
  },
  {
    id: "brush-footed-butterflies",
    label: "Brush-footed Butterflies",
    bugCount: 5,
    src: BrushFootedButterfly,
    size: "500px",
    subcategory: bugSubcategories.brushFootedButterflies,
  },
  {
    id: "bee",
    label: "Bee",
    bugCount: 25,
    src: Bee,
    subcategory: bugSubcategories.bees,
  },
  {
    id: "ant",
    label: "Ant",
    bugCount: 25,
    src: Ant,
    subcategory: bugSubcategories.ants,
  },
  {
    id: "wasp",
    label: "Wasp",
    bugCount: 25,
    src: Wasp,
    subcategory: bugSubcategories.waspsHornets,
  },
  {
    id: "fly",
    label: "Fly",
    bugCount: 100,
    src: Fly,
    subcategory: bugSubcategories.houseflies,
  },
  {
    id: "hover-fly",
    label: "Hover Fly",
    bugCount: 25,
    src: Hoverfly,
    subcategory: bugSubcategories.hoverFly,
  },
  {
    id: "mosquito",
    label: "Mosquitoes",
    bugCount: 25,
    src: Mosquito,
    subcategory: bugSubcategories.mosquitoes,
  },
  {
    id: "american-cockroach",
    label: "American Cockroach",
    bugCount: 25,
    src: Cockroach,
    subcategory: bugSubcategories.pestCockroaches,
  },
  {
    id: "large-cockroach",
    label: "Large Cockroach",
    bugCount: 5,
    src: CockroachLarge,
    subcategory: bugSubcategories.wildGiantCockroaches,
  },
  {
    id: "termite",
    label: "Termite",
    bugCount: 25,
    src: Termite,
    subcategory: bugSubcategories.termites,
  },
];

export default bugs;
