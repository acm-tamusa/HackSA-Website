/**
 * Challenge Cards Component
 *
 * Cards for challenge section in home page
 * To add a linebreak for the description, simply add \n into the string value where needed in firebase
 */

function HomeChallengeCard(props) {
  var description;
  if (props.description !== undefined && props.description !== null) {
    description = props.description.replaceAll('\\n', '\n');
  }
  return (
    <div className="bg-primary/50 w-full rounded-lg p-6 text-primaryDark">
      <div className="text-left text-white font-bold md:text-2xl test-base">{props.title} Hack</div>
      <div className="text-left md:text-xl text-white  test-base">
        Presented by {props.organization}
      </div>
      <p className="text-white whitespace-pre-line my-3 md:text-base text-xs">{description}</p>
      {props.prizes !== null && props.prizes !== undefined && (
        <div className="text-white md:text-base text-sm">
          <div className="underline font-medium md:text-base text-sm">Prizes</div>
          <ul className="list-decimal list-inside md:text-base text-sm">
            {props.prizes.map((prize, idx) => (
              <li key={idx}>{prize}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomeChallengeCard;
