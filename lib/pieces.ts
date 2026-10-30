export type Piece = {
  id: string;
  name: string;
  src: string;
  alt: string;
  style: string;
  summary: string;
  wear: string;
};

// The ring in the hero: pieces cut out of Pinterest flat-lays, with overlaps removed and hidden parts
// mirrored back in. Neighbours are mixed on purpose: top, bottom, shoe, hat.
// To add more, save a cut-out with a transparent background as public/pieces/<id>.webp and list it here.
const piece = (id: string, name: string, alt: string, style: string, summary: string, wear: string): Piece =>
  ({ id, name, src: `/pieces/${id}.webp`, alt, style, summary, wear });

export const pieces: Piece[] = [
  piece('dior-crewneck', 'Dior Sports crewneck', 'A navy crewneck sweatshirt with a white Christian Dior Sports logo', 'Vintage logo',
    'A navy fleece crewneck with the old Christian Dior Sports wordmark across the chest.', 'Over a CK waistband and dark raw denim, finished with a fitted cap.'),
  piece('raw-denim-jeans', 'Raw denim barrel jeans', 'Dark indigo raw denim jeans with a wide barrel leg', 'Barrel denim',
    'Deep indigo raw denim with a curved barrel leg and a long stack at the hem.', 'Let a boxer waistband sit above the waist; navy knit on top, Sambas below.'),
  piece('navy-sambas', 'Navy croc Sambas', 'Navy croc-texture Adidas Sambas with cream stripes', 'Terrace, blokecore',
    'Low-profile Sambas in glossy navy croc with cream stripes and a gum sole.', 'With dark denim and a navy crewneck, so the whole fit stays in one colour.'),
  piece('yankees-fitted', 'Navy fitted cap', 'A navy fitted baseball cap with a white script', 'Sportswear',
    'A navy fitted cap with white script on the side and the MLB logo at the back.', 'With a navy crewneck and dark denim, matching the shade.'),
  piece('black-tank', 'Black ribbed tank', 'A black ribbed tank top', 'Clean basics',
    'A fitted black rib tank with a deep scoop at the arms.', 'Tucked into wide grey sweats with a boxer band showing; silver at the neck.'),
  piece('grey-sweats', 'Wide grey sweatpants', 'Wide-leg heather grey sweatpants with a boxer waistband showing', 'Lounge, off-duty',
    'Heather-grey fleece sweats with a drawstring and a wide straight leg.', 'Low on the hip with a waistband showing, black tank and slides.'),
  piece('superstars', 'Black Superstars', 'Black Adidas Superstar sneakers with white stripes', 'Classic hip-hop',
    'All-black shell toes with white stripes and a gold tongue tag.', 'Under black baggy jeans, laces loose.'),
  piece('nb-beanie', 'Black skull beanie', 'A black fitted beanie with a silver New Balance logo', 'Athleisure',
    'A thin black skull cap with a reflective NB logo.', 'Pulled low with a tank, sweats and a digital watch.'),
  piece('ribbed-knit', 'Black ribbed knit', 'A black ribbed crewneck sweater with a cross pendant worn over it', 'Dark minimal',
    'A heavy black rib-knit crewneck, cropped just above the hip.', 'Layer a long chain over it and wear it with black barrel jeans.'),
  piece('black-baggy-jeans', 'Black baggy jeans', 'Black wide-leg jeans with a white boxer waistband showing', 'All-black',
    'Black denim with a relaxed, slightly curved leg that pools at the ankle.', 'With a black knit, a long chain and black-and-white shell toes.'),
  piece('black-runners', 'Black chunky runners', 'All-black chunky running sneakers with an air unit', 'Techwear',
    'Triple-black runners with a sculpted upper and a visible air heel.', 'With an all-black fit to keep it sleek; let the jeans stack on top.'),
  piece('face-beanie', 'Graphic print beanie', 'A cream beanie printed with a face photo and Japanese text', 'Archive graphic',
    'A cream knit beanie printed with a grainy face photo and vertical Japanese text.', 'The loud piece on a pale fit: track jacket, light jeans, grey frames.'),
  piece('stussy-tee', 'Stüssy graphic tee', 'A white tee with a black gothic photo print and Stüssy script', 'Skate graphic',
    'A white tee with a grainy black photo print and the Stüssy script under it.', 'Under a black knit with only the hem and sleeves peeking out.'),
  piece('washed-black-jeans', 'Washed black barrel jeans', 'Washed black barrel-leg jeans with a waistband showing', 'Barrel denim',
    'Faded black denim cut in a full barrel leg.', 'With a boxy black logo tee, a chunky steel watch and black runners.'),
  piece('gel-runners', 'Silver Gel runners', 'Silver and navy ASICS Gel running sneakers', 'Y2K runner',
    'Silver mesh runners with navy stripes and a chunky gel sole.', 'With pale baggy jeans that sit over the tongue.'),
  piece('web-beanie', 'Spider-web beanie', 'A blue beanie with a white spider-web knit', 'Y2K',
    'A bright blue beanie with a white spider web knitted across it.', 'With a white jersey and light jeans, so the blue ties it together.'),
  piece('cdg-tee', 'CDG 1986 été tee', 'A black tee printed 1986 été Comme des Garçons', 'Japanese label',
    'A black tee printed “1986 été COMME des GARÇONS”, small CDG tag at the neck.', 'Half-tucked into washed black barrel jeans with all-black runners.'),
  piece('light-baggy-jeans', 'Light-wash baggy jeans', 'Pale blue extra-wide jeans with grey boxers showing', 'Y2K baggy',
    'Extra-wide pale bleached jeans that run long over the shoe.', 'Pull a grey boxer band above the waist and wear with chunky silver runners.'),
  piece('dc-skates', 'Black skate shoes', 'Puffy black DC skate shoes with a gum sole', '2000s skate',
    'Black padded skate shoes with a gum sole, straight out of the 2000s.', 'With wide sweats or baggy denim and white socks.'),
  piece('embroidered-zip', 'Embroidered track jacket', 'A cream zip track jacket covered in dark baroque embroidery', 'Y2K ornate',
    'A cream zip-up with a high collar and dark baroque scrollwork all over it.', 'Over pale baggy jeans with a grey boxer band, plus silver Gel runners.'),
  piece('script-sweats', 'Script-print sweatpants', 'Grey sweatpants with a black script print down one leg', 'Streetwear',
    'Grey wide sweats with black script running down the right leg.', 'With an open flannel hoodie, a white tank and black skate shoes.'),
  piece('shox', 'Silver Shox', 'White and silver Nike Shox with blue swooshes', 'Y2K runner',
    'Silver Shox with the spring-column heel and blue swooshes.', 'With light striped jeans that break just above them.'),
  piece('flannel-hoodie', 'Flannel-lined hoodie', 'A grey zip hoodie lined with blue plaid flannel', 'Workwear grunge',
    'A heather-grey zip hoodie with a blue plaid flannel lining that shows when it falls open.', 'Open over a white tank with script sweats and black skate shoes.'),
  piece('striped-jeans', 'Side-stripe jeans', 'Light blue jeans with white track stripes down the sides', 'Blokecore',
    'Light-wash wide jeans with white track stripes down each outer seam.', 'With a football jersey and silver runners; keep the top plain.'),
  piece('white-tank', 'White ribbed tank', 'A white ribbed tank top', 'Clean basics',
    'A plain white rib tank, long in the body.', 'Under an open hoodie or flannel so it shows a clean white line.'),
  piece('stussy-jersey', 'Stüssy football jersey', 'A white football jersey with navy panels and a Stüssy script', 'Blokecore',
    'A white retro football shirt with navy side panels and the Stüssy script across the front.', 'With light striped jeans and a spider-web beanie for a full blokecore look.'),
];
