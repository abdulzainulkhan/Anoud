import React, { useEffect, useState } from "react";
import countries from "../../../data/countries.json";
import "../CardEntry.css";
import "../../home/adCards.css";
import "../../home/adCards-mobile.css";

export default function CardEntry() {
  const [cardVal, setCardVal] = useState({
    code: "",
    job_name: "",
    country_name: "",
    country_code: "",
    salary_amount: "",
    salary_sub: "",
    benefits: "",
    ad_image: "",
    ad_referral_phone: "",

    description: [],
    ad_image_file: "",
    manual_code: false,
  });

  const handleReset = () => {
    setCardVal({
      code: "",
      job_name: "",
      country_name: "",
      country_code: "",
      salary_amount: "",
      salary_sub: "",
      benefits: "",
      ad_image: "",
      ad_referral_phone: "",

      description: [],
      ad_image_file: "",
      manual_code: false,
    });
  };

  const handleCopyhelper = async () => {
    const text = `${cardVal.code}\t${cardVal.job_name}\t${cardVal.country_name}\t${cardVal.country_code}\t${cardVal.salary_amount}\t${cardVal.salary_sub}\t${cardVal.benefits.replace(/[\r\n]/g, "")}\t${cardVal.ad_image}\t${cardVal.ad_referral_phone}\tTRUE`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!!!");
    } catch (err) {
      alert(
        `Couldn't able to copy text to your clip board due to ${err.message}\nInstead you can copy manually from here ${text}`,
      );
    }
  };

  const generateCode = (country_name, job_name) => {
    if (country_name && job_name) {
      return `${country_name
        .toLowerCase()
        .replaceAll(" ", "_")
        .replaceAll(/[^A-Za-z0-9_ ]/g, "")}-${job_name
        .toLowerCase()
        .replaceAll(" ", "_")
        .replaceAll(
          /[^A-Za-z0-9_ ]/g,
          "",
        )}-${Math.floor(Math.random() * 1000)}`;
    } else return "";
  };

  /**
   * @param {"CODE" | "JOB_NAME" | "COUNTRY_NAME" | "COUNTRY_CODE" | "SALARY_AMOUNT" | "SALARY_SUB" | "BENEFITS" | "AD_IMAGE" | "AD_REFERRAL_PHONE" | "IS_ACTIVE"} fieldName
   * @param {string} value
   */
  const handleUserInput = (fieldName, value) => {
    switch (fieldName) {
      case "CODE":
        if (value === "")
          setCardVal((prev) => ({
            ...prev,
            manual_code: false,
            code: generateCode(prev.country_name, prev.job_name),
          }));
        else
          setCardVal((prev) => ({
            ...prev,
            manual_code: true,
            code: value,
          }));
        break;

      case "JOB_NAME":
        setCardVal((prev) => ({
          ...prev,
          job_name: value,
          code: prev.manual_code
            ? prev.code
            : generateCode(prev.country_name, value),
        }));
        break;

      case "COUNTRY_NAME":
        const count_code =
          countries.find((c) => c.name === value)?.alpha2.toLowerCase() ||
          false;
        setCardVal((prev) => ({
          ...prev,
          country_name: value,
          country_code: count_code || prev.country_code,
          code: prev.manual_code
            ? prev.code
            : generateCode(value || prev.country_code, prev.job_name),
        }));
        break;

      case "COUNTRY_CODE":
        console.log(value);

        const count_name =
          countries.find((c) => c.alpha2.toLowerCase() === value.toLowerCase())
            ?.name || false;
        setCardVal((prev) => ({
          ...prev,
          country_name: count_name || prev.country_name,
          country_code: value.toLowerCase(),
          code: prev.manual_code
            ? prev.code
            : generateCode(count_name || prev.country_name, prev.job_name),
        }));
        break;

      case "SALARY_AMOUNT":
      case "SALARY_SUB":
      case "AD_REFERRAL_PHONE":
        setCardVal((prev) => ({
          ...prev,
          [fieldName.toLowerCase()]: value,
        }));
        break;

      case "BENEFITS":
        const description = value.split(";").map((cd) => {
          const [, icon, desc] = cd.trim().match(/^<([^>]+)>\s*(.*)$/) || [];
          return { icon, desc };
        });
        setCardVal((prev) => ({
          ...prev,
          benefits: value,
          description,
        }));
        break;

      case "AD_IMAGE":
        setCardVal((prev) => ({
          ...prev,
          ad_image_file: value,
          ad_image: `https://raw.githubusercontent.com/abdulzainulkhan/Anoud/main/public/AdPosters/${value}`,
        }));
        break;

      default:
        break;
    }
  };

  return (
    <main className="card-entry">
      <header>
        <h3>Card Entry Preview</h3>
        <span className="sub-text">
          You may copy data from here to paste directly at Google Sheets -
          AdCards
        </span>
      </header>

      <div className="data-field-container">
        <div className="field">
          <label>Code</label>
          <input
            type="text"
            placeholder="this has autofill or you may enter manually"
            value={cardVal.code}
            onChange={(e) => handleUserInput("CODE", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Job Name</label>
          <input
            type="text"
            value={cardVal.job_name}
            onChange={(e) => handleUserInput("JOB_NAME", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Country Name</label>
          <input
            type="text"
            list="country-names"
            value={cardVal.country_name}
            onChange={(e) => handleUserInput("COUNTRY_NAME", e.target.value)}
          />

          <datalist id="country-names">
            {countries.map((c, idx) => (
              <option value={c.name} key={idx}>
                {c.name}
              </option>
            ))}
          </datalist>
        </div>

        <div className="field">
          <label>Country Code</label>
          <input
            type="text"
            list="country-codes"
            value={cardVal.country_code}
            onChange={(e) => handleUserInput("COUNTRY_CODE", e.target.value)}
          />

          <datalist id="country-codes">
            {countries.map((c, idx) => (
              <option value={c.alpha2.toLowerCase()} key={idx}>
                {`${c.name}: ${c.alpha2}`}
              </option>
            ))}
          </datalist>
        </div>

        <div className="field">
          <label>Salary Amount</label>
          <input
            type="text"
            value={cardVal.salary_amount}
            onChange={(e) => handleUserInput("SALARY_AMOUNT", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Salary Sub</label>
          <input
            type="text"
            value={cardVal.salary_sub}
            onChange={(e) => handleUserInput("SALARY_SUB", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Benefits</label>
          <textarea
            type="text"
            value={cardVal.benefits}
            onChange={(e) => handleUserInput("BENEFITS", e.target.value)}
          />
        </div>

        <div className="field image-name">
          <label>Image Name</label>
          <input
            type="text"
            placeholder="Just the image name + extension, we add rest of the github URL automatically"
            title="Just the image name, we add it to github path string automatically"
            value={cardVal.ad_image_file}
            onChange={(e) => handleUserInput("AD_IMAGE", e.target.value)}
          />
          <div className="link-preview">
            <a href={cardVal.ad_image} target="_blank">
              {cardVal.ad_image}
            </a>
          </div>
        </div>

        <div className="field">
          <label>Ref. Phone Number</label>
          <input
            type="text"
            placeholder="no +91 shit we ain't going international"
            title="no +91 shit we ain't going international"
            list="ref-phone-list"
            value={cardVal.ad_referral_phone}
            onChange={(e) =>
              handleUserInput("AD_REFERRAL_PHONE", e.target.value)
            }
          />

          <datalist id="ref-phone-list">
            <option value="9220702926">9220702926 - Heena Parveen</option>
            <option value="9205895056">9205895056 - Ali Asim</option>
          </datalist>
        </div>

        <div className="button-container">
          <button className="copy-btn" onClick={handleCopyhelper}>
            Copy to Clipboard
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="preview-window">
        <div className="home">
          <div className="heading">
            <h4>Ad Card Preview</h4>
          </div>
          <div className="ad-card-outline">
            <div className="ad-card">
              <div className="ad-header">
                <span className="flag">
                  {cardVal.country_code.length === 2 && (
                    <img
                      src={`https://flagcdn.com/w80/${cardVal.country_code}.png`}
                      alt=""
                    />
                  )}
                </span>
                <span className="country-name">{cardVal.country_name}</span>
              </div>

              <div className="ad-body">
                <div className="job-title">{cardVal.job_name}</div>

                <hr />

                <div className="pay-info">
                  {cardVal?.salary_currency && (
                    <span className="currency material-symbols-outlined">
                      {cardVal.salary_currency}
                    </span>
                  )}
                  <span className="amount">
                    {cardVal.salary_amount}
                    <span className="sub"> {cardVal.salary_sub}</span>
                  </span>
                </div>

                <hr />

                <div className="description">
                  <ul>
                    {cardVal.description.map((d, didx) => (
                      <li key={didx}>
                        {d?.icon && (
                          <span className="ad-desc-icon material-symbols-outlined">
                            {d?.icon}
                          </span>
                        )}
                        {d?.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="btn-container">
                <button
                  className="ad-apply-now-btn"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${cardVal.ad_referral_phone}?text=${encodeURIComponent(`Hey I would like to enquire about ${cardVal.job_name} Job in ${cardVal.country_name}`)}`,
                      "_blank",
                    )
                  }
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
